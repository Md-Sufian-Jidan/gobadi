import jwt from "jsonwebtoken";
import httpStatus from "http-status";
export const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
                data: null,
            });
            return;
        }
        if (req.user.role !== requiredRole) {
            res.status(httpStatus.FORBIDDEN).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden",
                data: null,
            });
            return;
        }
        next();
    };
};
export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
        const tokenFromCookie = req.cookies?.token;
        const token = tokenFromHeader || tokenFromCookie || req.headers["x-access-token"];
        if (!token) {
            res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
                data: null,
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        req.user = decoded;
        next();
    }
    catch {
        res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "Invalid or expired token",
            data: null,
        });
    }
};
