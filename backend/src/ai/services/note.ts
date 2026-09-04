import {
    createMessage,
    streamMessage,
    DEFAULT_MODEL,
    MAX_NOTE_CHARS
} from "../client/index.js";

import {
    buildNotePrompt,
    NOTE_ANALYSIS_SYSTEM
} from "../prompts/note.js";

import {
    AIError,
    NoteAnalysisWithUsage,
    StreamChunk,
    ParsedAnalysis
} from "../types/note.js";

function parseResponse(raw: string): ParsedAnalysis {
    let parsed: ParsedAnalysis;

    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new AIError(
            `Failed to parse AI response: ${raw}`,
            "INVALID_RESPONSE"
        )
    }

    if (
        !parsed.summary ||
        !Array.isArray(parsed.actionItems) ||
        !parsed.suggestedTitle ||
        !Array.isArray(parsed.suggestedTags)
    ) {
        throw new AIError(
            "AI response is missing required fields",
            "INVALID_RESPONSE"
        )
    }
    return parsed;
}

function validateContent(content: string) {
    if (!content?.trim()) {
        throw new AIError(
            "Note Content is Empty",
            "INVALID_RESPONSE"
        )
    }

    if (content.length > MAX_NOTE_CHARS) {
        throw new AIError(
            `Note Exceeds ${MAX_NOTE_CHARS} characters`,
            "CONTENT_TOO_LONG"
        )
    }
}

export async function analyseNote(
    title: string,
    content: string,
    tags: string[]
): Promise<NoteAnalysisWithUsage> {
    validateContent(content);

    const notePrompt = buildNotePrompt(title, tags, content);

    try {

        const response = await createMessage({
            system: NOTE_ANALYSIS_SYSTEM,
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: notePrompt
                },
            ],
        });

        const raw = response.content.find(
            block => block.type === "text"
        )?.text ?? "";

        const parsed = parseResponse(raw);

        return {
            ...parsed,
            tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens,
            model: response.model,
        }
    } catch (err) {
        if (err instanceof AIError) {
            throw err;
        }

        if (
            err instanceof Error &&
            err.message.toLowerCase().includes("rate")
        ) {
            throw new AIError(
                "Rate limit reached",
                "RATE_LIMIT",
                err
            );
        }

        throw new AIError(
            "AI API call failed",
            "API_ERROR",
            err
        )
    }

}

export async function* analyseNoteStream(
    title: string,
    content: string,
    tags: string[]
): AsyncGenerator<StreamChunk> {
    try {
        validateContent(content);
    } catch (err) {
        yield {
            type: "error",
            error: err instanceof AIError
                ? err.message
                : "Invalid Content"
        };
        return;
    }

    const notePrompt = buildNotePrompt(title, tags, content);

    let accumulatedText = '';
    let totalTokens = 0;
    try {
        const stream = streamMessage({
            system: NOTE_ANALYSIS_SYSTEM,
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: notePrompt,
                }
            ]
        });

        for await (const event of stream) {
            if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
            ) {
                accumulatedText += event.delta.text;
                yield {
                    type: "delta",
                    text: event.delta.text,
                };
            }


            if (event.type === "usage") {
                totalTokens = event.usage.totalTokens;
            }
        }

        const parsed = parseResponse(accumulatedText);

        yield {
            type: "done",
            delta: {
                ...parsed,
                tokensUsed: totalTokens,
                model: DEFAULT_MODEL
            }
        }
    } catch (err) {
        yield{
            type: "error",
            error: err instanceof Error
                ? err.message
                : "Unexpected AI Error"
        }
    }
}
