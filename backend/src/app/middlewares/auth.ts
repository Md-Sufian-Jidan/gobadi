import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
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

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    const tokenFromCookie = req.cookies?.token;
    const token = tokenFromHeader || tokenFromCookie || (req.headers["x-access-token"] as string | undefined);

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        data: null,
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Invalid or expired token",
      data: null,
    });
  }
};
