import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { env } from "../config/env";

export interface AuthenticatedUser {
  sub: number;
  role: string;
  phone?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authorize = (...requiredRoles: string[]) => {
  return (req: any, res: any, next: any): void => {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        data: null,
      });
      return;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
      res.status(httpStatus.FORBIDDEN).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Insufficient permissions for this action",
        data: null,
      });
      return;
    }

    next();
  };
};

export const authenticate = (
  req: any, res: any, next: any
): void => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;
    const token =
      tokenFromHeader ||
      req.cookies?.token ||
      (req.headers["x-access-token"] as string | undefined);

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Missing authentication token",
        data: null,
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as unknown as AuthenticatedUser;
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
