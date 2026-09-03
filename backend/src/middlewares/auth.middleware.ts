import {NextFunction, Request, Response} from "express";
import {JwtPayload, verifyJwtToken} from "../utils/jwt.js";
import {AppError} from "../errors/AppError.js";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    const token =
        req.cookies?.token ??
        req.headers.authorization?.replace(/^Bearer\s+/, '');

    console.log("token", req.cookies?.token);

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        req.user = verifyJwtToken(token);
        next();
    } catch (err) {
        throw new AppError("Invalid or Expired Token", 401);
    }
}