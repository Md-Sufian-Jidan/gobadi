"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../lib/prisma");
const env_1 = require("../config/env");
const DEFAULT_SUPER_ADMIN = {
    name: "Super Admin",
    email: env_1.env.ADMIN_EMAIL,
    password: env_1.env.ADMIN_PASSWORD,
    role: "super_admin",
    designation: "founder",
    status: "active",
    verified: true,
};
const seedSuperAdmin = async () => {
    try {
        const existing = await prisma_1.prisma.admin.findUnique({
            where: { email: DEFAULT_SUPER_ADMIN.email },
        });
        if (existing) {
            console.log("✅ Super admin already exists:", DEFAULT_SUPER_ADMIN.email);
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(DEFAULT_SUPER_ADMIN.password, 10);
        await prisma_1.prisma.admin.create({
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
        console.log("✅ Super admin seeded successfully:", DEFAULT_SUPER_ADMIN.email);
    }
    catch (error) {
        console.error("❌ Failed to seed super admin:", error);
    }
};
exports.seedSuperAdmin = seedSuperAdmin;
