import {Response, NextFunction} from "express";
import {addNote} from "../services/note.service.js";
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