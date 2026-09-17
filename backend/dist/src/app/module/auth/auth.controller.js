"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileHandler = exports.logoutHandler = exports.refreshTokenHandler = exports.facebookAuthHandler = exports.googleAuthHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyOtpHandler = exports.sendOtpHandler = exports.loginHandler = exports.registerHandler = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const registerHandler = async (req, res, next) => {
    try {
        const result = await (0, auth_service_1.register)(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerHandler = registerHandler;
const loginHandler = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const result = await (0, auth_service_1.login)(identifier, password);
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
        const { phone, purpose } = req.body;
        const result = await (0, auth_service_1.sendOtp)(phone, purpose);
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
        const { phone, code, purpose } = req.body;
        const result = await (0, auth_service_1.verifyOtp)(phone, code, purpose);
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
        const { identifier } = req.body;
        const result = await (0, auth_service_1.forgotPassword)(identifier);
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
        const result = await (0, auth_service_1.resetPassword)(resetToken, newPassword);
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
const googleAuthHandler = async (req, res, next) => {
    try {
        const { idToken } = req.body;
        const result = await (0, auth_service_1.loginWithGoogle)(idToken);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Google authentication successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.googleAuthHandler = googleAuthHandler;
const facebookAuthHandler = async (req, res, next) => {
    try {
        const { accessToken } = req.body;
        const result = await (0, auth_service_1.loginWithFacebook)(accessToken);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Facebook authentication successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.facebookAuthHandler = facebookAuthHandler;
const refreshTokenHandler = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        const result = await (0, auth_service_1.refreshTokens)(token);
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
        await (0, auth_service_1.logout)(token);
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
        const user = await (0, auth_service_1.getProfile)(req.user.sub);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Profile retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfileHandler = getProfileHandler;
