import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { env } from "../config/env";

export interface AdminAuthenticatedUser {
  sub: number;
  role: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminAuthenticatedUser;
    }
  }
}

export const adminAuthenticate = (
  req: any, res: any, next: any
): void => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;
    const token =
      tokenFromHeader ||
      req.cookies?.adminToken ||
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

    const decoded = jwt.verify(token, env.JWT_SECRET) as unknown as AdminAuthenticatedUser;
    req.admin = decoded;
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

export const adminAuthorize = (...requiredRoles: string[]) => {
  return (req: any, res: any, next: any): void => {
    if (!req.admin) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        data: null,
      });
      return;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(req.admin.role)) {
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
