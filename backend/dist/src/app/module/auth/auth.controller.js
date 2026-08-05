import { registerUser, loginUser, forgotPassword as forgotPasswordService, resetPassword as resetPasswordService, refreshAccessToken, logout as logoutService, getProfile as getProfileService, } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
export const register = async (req, res, next) => {
    try {
        const result = await registerUser(req.body);
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        sendResponse(res, {
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
export const logout = async (req, res, next) => {
    try {
        await logoutService(req.user.userId);
        sendResponse(res, {
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
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await forgotPasswordService(email);
        sendResponse(res, {
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
export const resetPassword = async (req, res, next) => {
    try {
        const tokenParam = Array.isArray(req.params.token) ? req.params.token[0] : req.params.token;
        const { password } = req.body;
        const result = await resetPasswordService(tokenParam, password);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Password reset successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) {
            sendResponse(res, {
                success: false,
                statusCode: 400,
                message: "Refresh token is required",
                data: null,
            });
            return;
        }
        const result = await refreshAccessToken(token);
        sendResponse(res, {
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
export const getProfile = async (req, res, next) => {
    try {
        const user = await getProfileService(req.user.userId);
        sendResponse(res, {
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
