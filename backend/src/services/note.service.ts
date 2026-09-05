import {NoteInput, NoteUpdateInput} from "../types/note.type.js";
import {noteRepository} from "../repository/note.repo.js";
import {AppError} from "../errors/AppError.js";

export const addNote = async (noteInput: NoteInput) => {
    return await noteRepository.createNote(noteInput);
}

export const getUserNotes = async (userId: string) => {
    return await noteRepository.fetchNotes(userId);
}

export const getNoteById = async (noteId: string) => {

    const note = await noteRepository.fetchNoteById(noteId);
    if (!note) {
        throw new AppError("Note Note Found!", 404);
    }
    return note;
}

export const updateNoteService = async (noteInput: NoteUpdateInput) => {
    const note = await noteRepository.updateNote(noteInput);
    if (!note) {
        throw new AppError("Note Note Found!", 404);
    }
    return note;
}

export const deleteNoteService = async (noteId: string) => {
    const note = await noteRepository.fetchNoteById(noteId);
    if (!note) {
        throw new AppError("Note Note Found!", 404);
    }
    return await noteRepository.deleteNote(noteId);
}