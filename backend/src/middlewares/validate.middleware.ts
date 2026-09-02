import {Request, Response, NextFunction} from "express";
import {ZodType} from "zod";
import {AppError} from "../errors/AppError.js";

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw new AppError("Validation failed", 400);
        }
        req.body = result.data;

        next();
    }
}