import {NoteInput} from "../types/note.type.js";
import {createNote, fetchNoteById, fetchNotes} from "../repository/note.repo.js";
import {AppError} from "../errors/AppError.js";

export const addNote = async (noteInput: NoteInput) => {
    return await createNote(noteInput);
}

export const getUserNotes = async (userId: string) => {
    return await fetchNotes(userId);
}

export const getNoteById = async (noteId: string) => {

    const note = await fetchNoteById(noteId);
    if (!note) {
        throw new AppError("Note Note Found!", 404);
    }
    return note;
}