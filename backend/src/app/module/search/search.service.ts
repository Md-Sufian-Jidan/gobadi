import { prisma } from "../../lib/prisma";

const MAX_RESULTS_PER_CATEGORY = 5;

export const globalSearch = async (query: string) => {
  const trimmed = query.trim();

  const [farmers, doctors, animals, notifications] = await Promise.all([
    // Farmers
    prisma.user.findMany({
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
    prisma.user.findMany({
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
    prisma.animal.findMany({
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
    prisma.notification.findMany({
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
