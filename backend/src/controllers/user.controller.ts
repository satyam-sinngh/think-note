import {Request, Response, NextFunction} from "express";
import {registerUser} from "../services/user.service.js";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
}