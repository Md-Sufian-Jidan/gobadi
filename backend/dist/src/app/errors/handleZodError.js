import status from 'http-status';
const handleZodError = (err) => {
    const statusCode = status.BAD_REQUEST;
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
export default handleZodError;
