"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, responseData) => {
    const { success, statusCode, message, data, meta } = responseData;
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        data,
        meta
    });
};
exports.sendResponse = sendResponse;
