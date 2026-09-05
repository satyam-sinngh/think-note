import prisma from "../lib/prisma.js";
import {NoteInput, NoteUpdateInput} from "../types/note.type.js";

export class NoteRepository {
    async fetchNotes(userId: string) {
        return await prisma.note.findMany({
            where: {
                user: {
                    id: userId,
                }
            }
        });
    }

    async createNote(data: NoteInput) {
        return await prisma.note.create({
            data
        })
    };

    async updateNote(input: NoteUpdateInput) {
        return await prisma.note.update({
            where: {
                id: input.id,
                userId: input.userId,
            },
            data: input.data
        })
    }

    async deleteNote(id: string) {
        return await prisma.note.delete({
            where: {
                id,
            },
        })
    }

    async fetchNoteById(id: string) {
        return await prisma.note.findUnique({
            where: {id: id},
        })
    }

    async findByIdAndUserId(noteId: string, userId: string) {
        return await prisma.note.findUnique({
            where: {
                id: noteId,
                userId: userId
            }
        })
    }

}

export const noteRepository = new NoteRepository();