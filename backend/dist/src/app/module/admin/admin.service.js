"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateAdmin = exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAllAdmins = exports.createAdmin = void 0;
const prisma_1 = require("../../lib/prisma");
const password_1 = require("../../middlewares/password");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createAdmin = async (data) => {
    const email = data.email.trim().toLowerCase();
    const existingAdmin = await prisma_1.prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
        throw new AppError_1.default(409, "Admin with this email already exists");
    }
    const admin = await prisma_1.prisma.admin.create({
        data: {
            name: data.name.trim(),
            email,
            password: await (0, password_1.hashPassword)(data.password),
            role: data.role || "admin",
            designation: data.designation,
            avatar: data.avatar,
            status: data.status || "active",
        },
    });
    return sanitizeAdmin(admin);
};
exports.createAdmin = createAdmin;
const getAllAdmins = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [admins, total] = await Promise.all([
        prisma_1.prisma.admin.findMany({
            skip,
            take: limit,
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                designation: true,
                avatar: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma_1.prisma.admin.count(),
    ]);
    return {
        admins,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
    };
};
exports.getAllAdmins = getAllAdmins;
const getAdminById = async (id) => {
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            designation: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    return admin;
};
exports.getAdminById = getAdminById;
const updateAdmin = async (id, data) => {
    const admin = await prisma_1.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    if (data.email && data.email !== admin.email) {
        const existing = await prisma_1.prisma.admin.findUnique({
            where: { email: data.email.toLowerCase() },
        });
        if (existing) {
            throw new AppError_1.default(409, "Email already in use");
        }
        data.email = data.email.toLowerCase();
    }
    if (data.password) {
        data.password = await (0, password_1.hashPassword)(data.password);
    }
    const updated = await prisma_1.prisma.admin.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            designation: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updated;
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (id) => {
    const admin = await prisma_1.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    await prisma_1.prisma.admin.delete({ where: { id } });
    return null;
};
exports.deleteAdmin = deleteAdmin;
const deactivateAdmin = async (id) => {
    const admin = await prisma_1.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    const newStatus = admin.status === "active" ? "deactive" : "active";
    const updated = await prisma_1.prisma.admin.update({
        where: { id },
        data: { status: newStatus },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            designation: true,
            avatar: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updated;
};
exports.deactivateAdmin = deactivateAdmin;
const sanitizeAdmin = (admin) => {
    const { password, ...safeAdmin } = admin;
    return safeAdmin;
};
