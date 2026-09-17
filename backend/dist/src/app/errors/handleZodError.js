"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    const statusCode = http_status_1.default.BAD_REQUEST;
    const message = 'Validation Error From Zod';
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path.join('.'),
            message: issue.message,
        });
    });
    return {
        statusCode,
        success: false,
        message,
        errorSources,
    };
};
exports.default = handleZodError;
