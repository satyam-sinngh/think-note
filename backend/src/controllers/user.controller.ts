import {Request, Response, NextFunction} from "express";
import {getUser, loginUser, registerUser, verifyUserAccount} from "../services/user.service.js";
import {AuthRequest} from "../middlewares/auth.middleware.js";

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
    try {


        const result = await verifyUserAccount(req.body);
        const {success, ...data} = result;
        return res.status(200).json({
            success,
            data,
        })
    } catch (err) {
        next(err)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {token, user} = await loginUser(req.body);
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7D
            })
            .json({
                success: true,
                user
            })
    } catch (err) {
        next(err);
    }
}

export const me = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getUser(req.user?.email!);
        return res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const logout = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7D
        });

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        next(err);
    }
}