import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import { sendResponse } from "../../utils/sendResponse";
import { hashPassword } from "../../middlewares/password";

const VALID_ROLES = ["user", "doctor", "clinic", "admin"] as const;
const ALLOWED_UPDATE_FIELDS = ["name", "avatar", "password", "phone"];
const ADMIN_UPDATE_FIELDS = [
  ...ALLOWED_UPDATE_FIELDS,
  "email",
  "role",
  "verified",
];

const getParamId = (id: string | string[]): number => {
  const raw = Array.isArray(id) ? id[0] : id;
  return parseInt(raw, 10);
};

export const getAllUsers = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          role: true,
          verified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: {
        users,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid user ID",
        data: null,
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "User not found",
        data: null,
      });
      return;
    }

    if (req.user!.role !== "admin" && user.id !== req.user!.sub) {
      sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "Access denied",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid user ID",
        data: null,
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "User not found",
        data: null,
      });
      return;
    }

    const isAdmin = req.user!.role === "admin";
    if (!isAdmin && user.id !== req.user!.sub) {
      sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "Access denied",
        data: null,
      });
      return;
    }

    const allowedFields = isAdmin ? ADMIN_UPDATE_FIELDS : ALLOWED_UPDATE_FIELDS;
    const sanitizedData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        sanitizedData[field] = req.body[field];
      }
    }

    if (!isAdmin) {
      if (req.body.email !== undefined || req.body.role !== undefined) {
        sendResponse(res, {
          success: false,
          statusCode: 403,
          message:
            "You can only update your profile details like name, avatar, phone, and password",
          data: null,
        });
        return;
      }
    }

    if (sanitizedData.password) {
      sanitizedData.password = await hashPassword(sanitizedData.password);
    }

    const file = (req as any).file;
    if (file?.filename) {
      sanitizedData.avatar = `/uploads/${file.filename}`;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: sanitizedData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid user ID",
        data: null,
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "User not found",
        data: null,
      });
      return;
    }

    await prisma.user.delete({ where: { id } });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
