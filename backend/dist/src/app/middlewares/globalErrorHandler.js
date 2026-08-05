import status from "http-status";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { env } from "../config/env";
import AppError from "../errors/AppError";
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = status.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errorSources = [];
    let stack = err.stack;
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message
            }
        ];
    }
    else if (err instanceof Error) {
        statusCode = status.BAD_REQUEST;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message
            }
        ];
    }
    const errorResponse = {
        success: false,
        statusCode: statusCode,
        message: message,
        errorSources,
        error: env.NODE_ENV === 'development' ? err : undefined,
        stack: env.NODE_ENV === 'development' ? stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
};
export default globalErrorHandler;
