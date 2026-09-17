"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalSearch = void 0;
const prisma_1 = require("../../lib/prisma");
const MAX_RESULTS_PER_CATEGORY = 5;
const globalSearch = async (query) => {
    const trimmed = query.trim();
    const [farmers, doctors, animals, notifications] = await Promise.all([
        // Farmers
        prisma_1.prisma.user.findMany({
            where: {
                role: "user",
                OR: [
                    { name: { contains: trimmed, mode: "insensitive" } },
                    { email: { contains: trimmed, mode: "insensitive" } },
                    { phone: { contains: trimmed, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                verified: true,
            },
            take: MAX_RESULTS_PER_CATEGORY,
            orderBy: { id: "desc" },
        }),
        // Doctors
        prisma_1.prisma.user.findMany({
            where: {
                role: "doctor",
                OR: [
                    { name: { contains: trimmed, mode: "insensitive" } },
                    { email: { contains: trimmed, mode: "insensitive" } },
                    { phone: { contains: trimmed, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                verified: true,
            },
            take: MAX_RESULTS_PER_CATEGORY,
            orderBy: { id: "desc" },
        }),
        // Animals
        prisma_1.prisma.animal.findMany({
            where: {
                OR: [
                    { name: { contains: trimmed, mode: "insensitive" } },
                    { breed: { contains: trimmed, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                breed: true,
                image: true,
                userId: true,
            },
            take: MAX_RESULTS_PER_CATEGORY,
            orderBy: { id: "desc" },
        }),
        // Notifications
        prisma_1.prisma.notification.findMany({
            where: {
                OR: [
                    { title: { contains: trimmed, mode: "insensitive" } },
                    { body: { contains: trimmed, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                title: true,
                body: true,
                type: true,
                isRead: true,
                createdAt: true,
            },
            take: MAX_RESULTS_PER_CATEGORY,
            orderBy: { id: "desc" },
        }),
    ]);
    return { farmers, doctors, animals, notifications };
};
exports.globalSearch = globalSearch;
