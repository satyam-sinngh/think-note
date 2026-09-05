import {AIGenerationRepository} from "../repository/ai-generation.repository.js";

import {NoteRepository} from "../repository/note.repo.js";

import {analyseNote} from "../ai/index.js";
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

}
