import { prisma } from "../../lib/prisma";
import AppError from "../../errors/AppError";
import { NotificationType as AppNotificationType } from "./notification.interface";

type PrismaNotificationType = "order" | "booking" | "payment" | "delivery" | "reminder" | "ai_ready" | "prescription_ready" | "promotion" | "system" | "message" | "referral";

export const createNotification = async (data: {
  title: string;
  body: string;
  type?: string;
  userId: number;
  referenceType?: string;
  referenceId?: string;
}) => {
  const user = await prisma.user.findUnique({ where: { id: data.userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const notification = await prisma.notification.create({
    data: {
      title: data.title,
      body: data.body,
      type: (data.type as PrismaNotificationType) || "system",
      userId: data.userId,
      referenceType: data.referenceType || null,
      referenceId: data.referenceId || null,
    },
  });

  return notification;
};

export const sendToUsers = async (
  userIds: number[],
  title: string,
  body: string,
  type: string = AppNotificationType.SYSTEM,
  referenceType?: string,
  referenceId?: string
) => {
  const data = userIds.map((userId) => ({
    title,
    body,
    type: type as PrismaNotificationType,
    userId,
    referenceType: referenceType || null,
    referenceId: referenceId || null,
  }));

  const result = await prisma.notification.createMany({ data });
  return { count: result.count };
};

export const getAllNotifications = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  type?: string
) => {
  const skip = (page - 1) * limit;

  const q = search?.trim();
  const numericId = q && /^\d+$/.test(q) ? parseInt(q, 10) : undefined;

  const where = {
    ...(type && type !== "all" ? { type: type as PrismaNotificationType } : {}),
    ...(q
      ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { body: { contains: q, mode: "insensitive" as const } },
          { user: { name: { contains: q, mode: "insensitive" as const } } },
          { user: { email: { contains: q, mode: "insensitive" as const } } },
          { user: { phone: { contains: q, mode: "insensitive" as const } } },
          ...(numericId ? [{ id: numericId }] : []),
        ],
      }
      : {}),
  };

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
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
    prisma.notification.count({ where }),
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

export const getNotificationsByUser = async (
  userId: number,
  page: number = 1,
  limit: number = 20
) => {
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.notification.count({ where: { userId } }),
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

export const getUnreadCount = async (): Promise<number> => {
  return prisma.notification.count({
    where: { isRead: false },
  });
};

export const markAsRead = async (id: number, userId: number) => {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) {
    throw new AppError(404, "Notification not found");
  }
  if (notification.userId !== userId) {
    throw new AppError(403, "Access denied");
  }

  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};

export const markAllAsRead = async (userId: number) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

  return { success: true };
};

export const deleteNotification = async (id: number) => {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) {
    throw new AppError(404, "Notification not found");
  }

  await prisma.notification.delete({ where: { id } });
  return null;
};

export const getNotificationById = async (id: number) => {
  const notification = await prisma.notification.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true, phone: true },
      },
    },
  });

  if (!notification) {
    throw new AppError(404, "Notification not found");
  }

  return notification;
};

export const broadcastNotification = async (data: {
  title: string;
  body: string;
  type?: string;
  role?: string;
  occurrence?: string;
  time?: string;
}) => {
  const whereClause = data.role ? { role: data.role as any } : {};

  const users = await prisma.user.findMany({
    where: whereClause,
    select: { id: true },
  });

  if (users.length === 0) {
    return { success: true, count: 0 };
  }

  await prisma.notification.createMany({
    data: users.map((user) => ({
      title: data.title,
      body: data.body,
      type: (data.type as PrismaNotificationType) || "system",
      userId: user.id,
      occurrence: data.occurrence || null,
      time: data.time || null,
    })),
  });

  return { success: true, count: users.length };
};
