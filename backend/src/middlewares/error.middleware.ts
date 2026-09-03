import {NextFunction, Request, Response} from "express";
import {AppError} from "../errors/AppError.js";

export const errorMiddleware = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.error(error);

    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({
                success: false,
                message: error.message
            });
    }

    return response
        .status(500)
        .json({
            success: false,
            message: "Internal Server error"
        })

}