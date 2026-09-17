import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../middlewares/password";
import AppError from "../../errors/AppError";
import { AdminRole, AdminDesignation, AdminStatus } from "./admin.interface";

export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  role?: AdminRole;
  designation: AdminDesignation;
  avatar?: string;
  status?: AdminStatus;
}) => {
  const email = data.email.trim().toLowerCase();

  const existingAdmin = await prisma.admin.findUnique({ where: { email } });
  if (existingAdmin) {
    throw new AppError(409, "Admin with this email already exists");
  }

  const admin = await prisma.admin.create({
    data: {
      name: data.name.trim(),
      email,
      password: await hashPassword(data.password),
      role: (data.role as any) || "admin",
      designation: data.designation as any,
      avatar: data.avatar,
      status: (data.status as any) || "active",
    },
  });

  return sanitizeAdmin(admin);
};

export const getAllAdmins = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [admins, total] = await Promise.all([
    prisma.admin.findMany({
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
    prisma.admin.count(),
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

export const getAdminById = async (id: number) => {
  const admin = await prisma.admin.findUnique({
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
    throw new AppError(404, "Admin not found");
  }
  return admin;
};

export const updateAdmin = async (id: number, data: Record<string, any>) => {
  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }

  if (data.email && data.email !== admin.email) {
    const existing = await prisma.admin.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existing) {
      throw new AppError(409, "Email already in use");
    }
    data.email = data.email.toLowerCase();
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const updated = await prisma.admin.update({
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

export const deleteAdmin = async (id: number) => {
  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }
  await prisma.admin.delete({ where: { id } });
  return null;
};

export const deactivateAdmin = async (id: number) => {
  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }

  const newStatus = admin.status === "active" ? "deactive" : "active";

  const updated = await prisma.admin.update({
    where: { id },
    data: { status: newStatus as any },
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

const sanitizeAdmin = (admin: any) => {
  const { password, ...safeAdmin } = admin;
  return safeAdmin;
};
