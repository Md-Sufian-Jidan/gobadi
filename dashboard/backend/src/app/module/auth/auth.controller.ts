import { Request, Response, NextFunction } from "express";
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  loginWithFacebook,
  refreshTokens,
  logout,
  getProfile,
} from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

export const registerHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const result = await register(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { identifier, password } = req.body;
    const result = await login(identifier, password);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const sendOtpHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { phone, purpose } = req.body;
    const result = await sendOtp(phone, purpose);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { phone, code, purpose } = req.body;
    const result = await verifyOtp(phone, code, purpose);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { identifier } = req.body;
    const result = await forgotPassword(identifier);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { resetToken, newPassword } = req.body;
    const result = await resetPassword(resetToken, newPassword);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuthHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { idToken } = req.body;
    const result = await loginWithGoogle(idToken);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Google authentication successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const facebookAuthHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { accessToken } = req.body;
    const result = await loginWithFacebook(accessToken);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Facebook authentication successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;
    const result = await refreshTokens(token);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;
    await logout(token);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const user = await getProfile(req.user!.sub);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
