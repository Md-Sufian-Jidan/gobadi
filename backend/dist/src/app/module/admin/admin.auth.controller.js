"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileHandler = exports.getProfileHandler = exports.logoutHandler = exports.refreshTokenHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyOtpHandler = exports.sendOtpHandler = exports.loginHandler = void 0;
const admin_auth_service_1 = require("./admin.auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder: "gobadi/avatars",
            resource_type: "image",
        }, (error, result) => {
            if (error || !result?.secure_url) {
                reject(error || new Error("Failed to upload image"));
                return;
            }
            resolve(result.secure_url);
        });
        stream.end(file.buffer);
    });
};
const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await (0, admin_auth_service_1.login)(email, password);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginHandler = loginHandler;
const sendOtpHandler = async (req, res, next) => {
    try {
        const { email, purpose } = req.body;
        const result = await (0, admin_auth_service_1.sendOtp)(email, purpose);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendOtpHandler = sendOtpHandler;
const verifyOtpHandler = async (req, res, next) => {
    try {
        const { email, code, purpose } = req.body;
        const result = await (0, admin_auth_service_1.verifyOtp)(email, code, purpose);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOtpHandler = verifyOtpHandler;
const forgotPasswordHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await (0, admin_auth_service_1.forgotPassword)(email);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = async (req, res, next) => {
    try {
        const { resetToken, newPassword } = req.body;
        const result = await (0, admin_auth_service_1.resetPassword)(resetToken, newPassword);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPasswordHandler = resetPasswordHandler;
const refreshTokenHandler = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        const result = await (0, admin_auth_service_1.refreshTokens)(token);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Token refreshed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokenHandler = refreshTokenHandler;
const logoutHandler = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        await (0, admin_auth_service_1.logout)(token);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Logged out successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutHandler = logoutHandler;
const getProfileHandler = async (req, res, next) => {
    try {
        const admin = await (0, admin_auth_service_1.getProfile)(req.admin.sub);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Profile retrieved successfully",
            data: admin,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfileHandler = getProfileHandler;
const updateProfileHandler = async (req, res, next) => {
    try {
        let avatar;
        const file = req.file;
        if (file?.buffer) {
            avatar = await uploadImageToCloudinary(file);
        }
        const admin = await (0, admin_auth_service_1.updateProfile)(req.admin.sub, { ...req.body, avatar });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Profile updated successfully",
            data: admin,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfileHandler = updateProfileHandler;
