import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";

const DEFAULT_SUPER_ADMIN = {
  name: "Super Admin",
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
  role: "super_admin" as const,
  designation: "founder" as const,
  status: "active" as const,
  verified: true,
};

export const seedSuperAdmin = async (): Promise<void> => {
  try {
    const existing = await prisma.admin.findUnique({
      where: { email: DEFAULT_SUPER_ADMIN.email },
    });

    if (existing) {
      // console.log("✅ Super admin already exists:", DEFAULT_SUPER_ADMIN.email);
      return;
    }

    const passwordHash = await bcrypt.hash(DEFAULT_SUPER_ADMIN.password, 10);

    await prisma.admin.create({
      data: {
        name: DEFAULT_SUPER_ADMIN.name,
        email: DEFAULT_SUPER_ADMIN.email,
        password: passwordHash,
        role: DEFAULT_SUPER_ADMIN.role,
        designation: DEFAULT_SUPER_ADMIN.designation,
        status: DEFAULT_SUPER_ADMIN.status,
        verified: DEFAULT_SUPER_ADMIN.verified,
      },
    });

    // console.log("✅ Super admin seeded successfully:", DEFAULT_SUPER_ADMIN.email);
  } catch (error) {
    // console.error("❌ Failed to seed super admin:", error);
  }
};
