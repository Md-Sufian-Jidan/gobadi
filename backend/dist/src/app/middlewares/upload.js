"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageMiddleware = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
/** Middleware for video uploads (up to 100 MB) */
exports.uploadMiddleware = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only video files are allowed"));
        }
    },
});
/** Middleware for image uploads (up to 5 MB) */
exports.uploadImageMiddleware = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed"));
        }
    },
});
