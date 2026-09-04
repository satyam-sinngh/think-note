import prisma from "../lib/prisma.js";
import {NoteInput, NoteUpdateInput} from "../types/note.type.js";

export const fetchNotes = async (userId: string) => {
    return await prisma.note.findMany({
        where: {
            user: {
                id: userId,
            }
        }
    });
}

export const createNote = async (data: NoteInput) => {
    return await prisma.note.create({
        data
    })
};

export const updateNote = async (input: NoteUpdateInput) => {
    return await prisma.note.update({
        where: {id: input.id},
        data: input.data
    })
}

export const deleteNote = async (id: string) => {
    return await prisma.note.delete({
        where: {id},
    })
}

export const fetchNoteById = async (id: string) => {
    return await prisma.note.findUnique({
        where: {id: id},
    })
}