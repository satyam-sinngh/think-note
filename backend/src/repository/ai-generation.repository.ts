import {AiGenerationInput} from "../types/ai-generation.type.js";
import prisma from "../lib/prisma.js";

export class AIGenerationRepository {
    async create(data: AiGenerationInput) {
        return await prisma.aiGeneration.create({
            data
        })
    }

    async getByNoteId(noteId: string) {
        return await prisma.aiGeneration.findFirst({
            where: {
                noteId: noteId,
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }
}

export const aiGenerationRepository = new AIGenerationRepository();