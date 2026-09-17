"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_1 = require("../../lib/prisma");
const sendResponse_1 = require("../../utils/sendResponse");
const password_1 = require("../../middlewares/password");
const VALID_ROLES = ["user", "doctor", "clinic", "admin"];
const ALLOWED_UPDATE_FIELDS = ["name", "avatar", "password", "phone"];
const ADMIN_UPDATE_FIELDS = [
    ...ALLOWED_UPDATE_FIELDS,
    "email",
    "role",
    "verified",
];
const getParamId = (id) => {
    const raw = Array.isArray(id) ? id[0] : id;
    return parseInt(raw, 10);
};
const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "10", 10);
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            prisma_1.prisma.user.findMany({
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
            prisma_1.prisma.user.count(),
        ]);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            data: {
                users,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid user ID",
                data: null,
            });
            return;
        }
        const user = await prisma_1.prisma.user.findUnique({
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
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        if (req.user.role !== "admin" && user.id !== req.user.sub) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 403,
                message: "Access denied",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid user ID",
                data: null,
            });
            return;
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        const isAdmin = req.user.role === "admin";
        if (!isAdmin && user.id !== req.user.sub) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 403,
                message: "Access denied",
                data: null,
            });
            return;
        }
        const allowedFields = isAdmin ? ADMIN_UPDATE_FIELDS : ALLOWED_UPDATE_FIELDS;
        const sanitizedData = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined && req.body[field] !== "") {
                sanitizedData[field] = req.body[field];
            }
        }
        if (!isAdmin) {
            if (req.body.email !== undefined || req.body.role !== undefined) {
                (0, sendResponse_1.sendResponse)(res, {
                    success: false,
                    statusCode: 403,
                    message: "You can only update your profile details like name, avatar, phone, and password",
                    data: null,
                });
                return;
            }
        }
        if (sanitizedData.password) {
            sanitizedData.password = await (0, password_1.hashPassword)(sanitizedData.password);
        }
        const file = req.file;
        if (file?.filename) {
            sanitizedData.avatar = `/uploads/${file.filename}`;
        }
        const updated = await prisma_1.prisma.user.update({
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
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid user ID",
                data: null,
            });
            return;
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        await prisma_1.prisma.user.delete({ where: { id } });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
