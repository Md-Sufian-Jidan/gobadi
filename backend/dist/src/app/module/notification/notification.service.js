"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastNotification = exports.getNotificationById = exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getUnreadCount = exports.getNotificationsByUser = exports.getAllNotifications = exports.sendToUsers = exports.createNotification = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const notification_interface_1 = require("./notification.interface");
const createNotification = async (data) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const notification = await prisma_1.prisma.notification.create({
        data: {
            title: data.title,
            body: data.body,
            type: data.type || "system",
            userId: data.userId,
            referenceType: data.referenceType || null,
            referenceId: data.referenceId || null,
        },
    });
    return notification;
};
exports.createNotification = createNotification;
const sendToUsers = async (userIds, title, body, type = notification_interface_1.NotificationType.SYSTEM, referenceType, referenceId) => {
    const data = userIds.map((userId) => ({
        title,
        body,
        type: type,
        userId,
        referenceType: referenceType || null,
        referenceId: referenceId || null,
    }));
    const result = await prisma_1.prisma.notification.createMany({ data });
    return { count: result.count };
};
exports.sendToUsers = sendToUsers;
const getAllNotifications = async (page = 1, limit = 20, search, type) => {
    const skip = (page - 1) * limit;
    const q = search?.trim();
    const numericId = q && /^\d+$/.test(q) ? parseInt(q, 10) : undefined;
    const where = {
        ...(type && type !== "all" ? { type: type } : {}),
        ...(q
            ? {
                OR: [
                    { title: { contains: q, mode: "insensitive" } },
                    { body: { contains: q, mode: "insensitive" } },
                    { user: { name: { contains: q, mode: "insensitive" } } },
                    { user: { email: { contains: q, mode: "insensitive" } } },
                    { user: { phone: { contains: q, mode: "insensitive" } } },
                    ...(numericId ? [{ id: numericId }] : []),
                ],
            }
            : {}),
    };
    const [notifications, total] = await Promise.all([
        prisma_1.prisma.notification.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true },
                },
            },
        }),
        prisma_1.prisma.notification.count({ where }),
    ]);
    return {
        notifications,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
    };
};
exports.getAllNotifications = getAllNotifications;
const getNotificationsByUser = async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
        prisma_1.prisma.notification.findMany({
            where: { userId },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.notification.count({ where: { userId } }),
    ]);
    return {
        notifications,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
    };
};
exports.getNotificationsByUser = getNotificationsByUser;
const getUnreadCount = async () => {
    return prisma_1.prisma.notification.count({
        where: { isRead: false },
    });
};
exports.getUnreadCount = getUnreadCount;
const markAsRead = async (id, userId) => {
    const notification = await prisma_1.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
        throw new AppError_1.default(404, "Notification not found");
    }
    if (notification.userId !== userId) {
        throw new AppError_1.default(403, "Access denied");
    }
    return prisma_1.prisma.notification.update({
        where: { id },
        data: { isRead: true },
    });
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (userId) => {
    await prisma_1.prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
    });
    return { success: true };
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (id) => {
    const notification = await prisma_1.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
        throw new AppError_1.default(404, "Notification not found");
    }
    await prisma_1.prisma.notification.delete({ where: { id } });
    return null;
};
exports.deleteNotification = deleteNotification;
const getNotificationById = async (id) => {
    const notification = await prisma_1.prisma.notification.findUnique({
        where: { id },
        include: {
            user: {
                select: { id: true, name: true, email: true, phone: true },
            },
        },
    });
    if (!notification) {
        throw new AppError_1.default(404, "Notification not found");
    }
    return notification;
};
exports.getNotificationById = getNotificationById;
const broadcastNotification = async (data) => {
    const whereClause = data.role ? { role: data.role } : {};
    const users = await prisma_1.prisma.user.findMany({
        where: whereClause,
        select: { id: true },
    });
    if (users.length === 0) {
        return { success: true, count: 0 };
    }
    await prisma_1.prisma.notification.createMany({
        data: users.map((user) => ({
            title: data.title,
            body: data.body,
            type: data.type || "system",
            userId: user.id,
            occurrence: data.occurrence || null,
            time: data.time || null,
        })),
    });
    return { success: true, count: users.length };
};
exports.broadcastNotification = broadcastNotification;
