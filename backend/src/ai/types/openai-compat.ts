export type GeminiCompatibleMessage = {
    model: string;

    content: Array<{
        type: "text";
        text: string;
    }>;

    usage: {
        input_tokens: number;
        output_tokens: number;
    };
};

export type GeminiCompatibleStreamEvent =
    | {
    type: "content_block_delta";
    delta: {
        type: "text_delta";
        text: string;
    };
}
    | {
    type: "usage";
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
    };
}

interface Message {
    role: "user";
    content: string;
}

export type GeminiCreateMessageInput = {
    system: string;
    messages: Message[];
    max_tokens?: number;
}