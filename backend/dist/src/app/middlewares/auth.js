"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const env_1 = require("../config/env");
const authorize = (...requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: "Unauthorized",
                data: null,
            });
            return;
        }
        if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
            res.status(http_status_1.default.FORBIDDEN).json({
                success: false,
                statusCode: http_status_1.default.FORBIDDEN,
                message: "Insufficient permissions for this action",
                data: null,
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : undefined;
        const token = tokenFromHeader ||
            req.cookies?.token ||
            req.headers["x-access-token"];
        if (!token) {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: "Missing authentication token",
                data: null,
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        res.status(http_status_1.default.UNAUTHORIZED).json({
            success: false,
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: "Invalid or expired token",
            data: null,
        });
    }
};
exports.authenticate = authenticate;
