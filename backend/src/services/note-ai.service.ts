import {aiGenerationRepository, AIGenerationRepository} from "../repository/ai-generation.repository.js";

import {noteRepository, NoteRepository} from "../repository/note.repo.js";

import {analyseNote, analyseNoteStream} from "../ai/index.js";
import {AppError} from "../errors/AppError.js";

export class NoteAIService {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly aiGenerationRepository: AIGenerationRepository,
    ) {
    }

    async summariseNote(
        noteId: string,
        userId: string,
    ) {
        const note = await this.noteRepository.findByIdAndUserId(noteId, userId);

        if (!note) {
            throw new AppError("Note Note Found!", 404);
        }
        const result = await analyseNote(
            note.title,
            note.content,
            note.tags
        );

        return await this.aiGenerationRepository.create({
            summary: result.summary,
            actionItems: result.actionItems,
            suggestedTitle: result.suggestedTitle,
            tokensUsed: result.tokensUsed,
            model: result.model,
            suggestedTags: result.suggestedTags,
            note: {
                connect: {
                    id: noteId,
                }
            }
        });

    }


    async* summariseNoteStream(
        noteId: string,
        userId: string,
    ) {
        const note = await this.noteRepository.findByIdAndUserId(noteId, userId);
        if (!note) {
            throw new AppError("Note Note Found!", 404);
        }

        for await (const chunk of analyseNoteStream(note.title, note.content, note.tags)) {
            yield chunk;

            if (chunk.type === "done" && chunk.delta) {
                const {summary, actionItems, suggestedTags, suggestedTitle, tokensUsed, model} = chunk.delta;
                await this.aiGenerationRepository.create({
                    summary,
                    actionItems,
                    suggestedTags,
                    tokensUsed,
                    suggestedTitle,
                    model,
                    note: {
                        connect: {
                            id: noteId,
                        }
                    }

                })
            }
        }
    }

}

export const noteAIService = new NoteAIService(
    noteRepository,
    aiGenerationRepository
);
