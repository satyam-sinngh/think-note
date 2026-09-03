import {Request, Response, NextFunction} from "express";
import {registerUser, verifyUserAccount} from "../services/user.service.js";

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

export const verify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const result = await verifyUserAccount(req.body);
    const {success, ...data} = result;
    return res.status(200).json({
        success,
        data,
    })
}