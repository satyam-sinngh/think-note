import {NoteInput} from "../types/note.type.js";
import {createNote, fetchNotes} from "../repository/note.repo.js";

export const addNote = async (noteInput: NoteInput) => {
    return await createNote(noteInput);
}

export const getUserNotes = async (userId: string) => {
    return await fetchNotes(userId);
}