import {Request, Response, NextFunction} from "express";
import {addNote, deleteNoteService, getNoteById, getUserNotes, updateNoteService} from "../services/note.service.js";
import {AuthRequest} from "../middlewares/auth.middleware.js";
import {AppError} from "../errors/AppError.js";

export const create = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError("Unauthorized", 401));
        }
        const {userId} = user;
        const payloadWithUserId = {...req.body, userId: userId};
        const note = await addNote(payloadWithUserId);

        return res.status(201).json({
            success: true,
            note
        })
    } catch (err) {
        next(err);
    }
}

export const fetchAllNotes = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError("Unauthorized", 401));
        }
        const notes = await getUserNotes(user.userId);
        return res.status(200).json({
            success: true,
            notes
        })


    } catch (err) {
        next(err)
    }
}

export const fetchNoteById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const note = await getNoteById(id);
        return res.status(200).json({
            success: true,
            note
        })
    } catch (err) {
        console.error(err)
        next(err);
    }
}

export const update = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const {id} = req.params;
    const user = req.user;
    if (!user) {
        return next(new AppError("Unauthorized", 401));
    }

    const payloadWithUser = {
        id,
        userId: user.userId,
        data: req.body
    }

    const updatedNote = await updateNoteService(payloadWithUser)
    return res.status(200).json({
        success: true,
        updatedNote
    })
}

export const deleteNote = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {id} = req.params;

        const deletedNote = await deleteNoteService(id);
        return res.status(200).json({
            success: true,
            deletedNote
        })

    } catch (err) {
        next(err);
    }
}