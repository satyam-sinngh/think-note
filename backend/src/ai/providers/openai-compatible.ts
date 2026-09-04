import {openai, DEFAULT_MODEL} from "../config/openai.js";
import {
    GeminiCompatibleMessage,
    GeminiCompatibleStreamEvent,
    GeminiCreateMessageInput
} from "../types/openai-compat.js";

export async function createMessage({
                                        system,
                                        messages,
                                        max_tokens = 1024
                                    }: GeminiCreateMessageInput): Promise<GeminiCompatibleMessage> {
    const response =
        await openai.chat.completions.create({
            model: DEFAULT_MODEL,

            response_format: {
                type: "json_object"
            },
            messages: [
                {
                    role: "system",
                    content: system
                },
                ...messages,
            ],
            max_completion_tokens: max_tokens,
        });

    console.log("Model Response:", response);

    return {
        model: response.model,
        content: [
            {
                type: "text",
                text: response.choices[0]?.message?.content ?? ""
            },
        ],

        usage: {
            input_tokens: response.usage?.prompt_tokens ?? 0,
            output_tokens: response.usage?.completion_tokens ?? 0
        }
    }
};


export async function* streamMessage({
                                         system,
                                         messages,
                                         max_tokens = 1024
                                     }: GeminiCreateMessageInput): AsyncGenerator<GeminiCompatibleStreamEvent> {
    const stream =
        await openai.chat.completions.create({
            model: DEFAULT_MODEL,
            stream: true,
            messages: [
                {
                    role: "system",
                    content: system
                },
                ...messages,
            ],
            max_completion_tokens: max_tokens,
        });

    for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (!text) {
            continue;
        }

        yield {
            type: "content_block_delta",
            delta: {
                type: "text_delta",
                text
            }
        }
    }
}