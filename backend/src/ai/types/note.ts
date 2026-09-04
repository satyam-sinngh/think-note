export interface NoteAnalysis {
    summary: string;
    actionItems: string[];
    suggestedTitle: string;
    suggestedTags: string[];
}

export interface NoteAnalysisWithUsage extends NoteAnalysis {
    tokensUsed: number;
    model: string;
}

export interface StreamChunk {
    type: "delta" | "done" | "error";
    text?: string;
    delta?: NoteAnalysisWithUsage;
    error?: string;
}

export type ParsedAnalysis = {
    summary: string;
    actionItems: string[];
    suggestedTitle: string;
    suggestedTags: string[];
};

export class AIError extends Error {
    public readonly code:
        | 'INVALID_RESPONSE'
        | 'API_ERROR'
        | 'RATE_LIMIT'
        | 'CONTENT_TOO_LONG';

    public override readonly cause?: unknown;

    constructor(
        message: string,
        code: 'INVALID_RESPONSE' | 'API_ERROR' | 'RATE_LIMIT' | 'CONTENT_TOO_LONG',
        cause?: unknown,
    ) {
        super(message);
        this.name = "AIError";
        this.code = code;
        this.cause = cause;
    }
}

