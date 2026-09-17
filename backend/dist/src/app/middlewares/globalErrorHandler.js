"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errorSources = [];
    let stack = err.stack;
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack = err.stack;
    }
    else if (err instanceof AppError_1.default) {
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
        statusCode = http_status_1.default.BAD_REQUEST;
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
        error: env_1.env.NODE_ENV === 'development' ? err : undefined,
        stack: env_1.env.NODE_ENV === 'development' ? stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
};
exports.default = globalErrorHandler;
