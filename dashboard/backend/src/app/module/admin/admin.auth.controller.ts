import { Request, Response, NextFunction } from "express";
import {
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  refreshTokens,
  logout,
  getProfile,
  updateProfile,
} from "./admin.auth.service";
import { sendResponse } from "../../utils/sendResponse";
import cloudinary from "../../config/cloudinary";

const uploadImageToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "gobadi/avatars",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error || new Error("Failed to upload image"));
          return;
        }
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

export const loginHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
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
    const { email, purpose } = req.body;
    const result = await sendOtp(email, purpose);
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
    const { email, code, purpose } = req.body;
    const result = await verifyOtp(email, code, purpose);
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
    const { email } = req.body;
    const result = await forgotPassword(email);
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
    const admin = await getProfile(req.admin!.sub);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileHandler = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    let avatar: string | undefined;
    const file = (req as any).file as Express.Multer.File | undefined;
    if (file?.buffer) {
      avatar = await uploadImageToCloudinary(file);
    }

    const admin = await updateProfile(req.admin!.sub, { ...req.body, avatar });
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};
