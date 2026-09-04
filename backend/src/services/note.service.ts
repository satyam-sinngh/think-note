import {NoteInput} from "../types/note.type.js";
import {createNote} from "../repository/note.repo.js";

export const addNote = async (noteInput: NoteInput) => {
    return await createNote(noteInput);
}