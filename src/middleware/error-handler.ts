import {Request, Response, NextFunction} from "express"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    const message = err.message;

    return res.status(statusCode).json({
        error: {
            status_code: statusCode,
            message: message,
        }
    });
}
