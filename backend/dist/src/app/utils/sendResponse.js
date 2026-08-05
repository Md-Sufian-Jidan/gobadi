export const sendResponse = (res, responseData) => {
    const { success, statusCode, message, data, meta } = responseData;
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        data,
        meta
    });
};
