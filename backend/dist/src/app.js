"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./app/config/env");
const sendResponse_1 = require("./app/utils/sendResponse");
const notFound_1 = require("./app/middlewares/notFound");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "16kb", }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use((0, cors_1.default)({
    origin: [env_1.env.FRONTEND_URL, "http://localhost:3000", "http://localhost:7000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Gobadi server is running successfully",
        data: {
            author: {
                name: "Gobadi",
                version: "1.0.0",
            },
            host: req.hostname,
            time: new Date().toISOString(),
        }
    });
});
app.use('/api/v1', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.notFound);
exports.default = app;
