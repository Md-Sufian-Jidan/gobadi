"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const prisma_1 = require("./app/lib/prisma");
const admin_seed_1 = require("./app/seed/admin.seed");
const seed_data_1 = require("./app/seed/seed.data");
let server;
async function main() {
    try {
        // Prisma connects automatically on first query, but we can explicitly connect
        await prisma_1.prisma.$connect();
        // console.log('🗃️  Database connected successfully');
        server = app_1.default.listen(env_1.env.PORT, async () => {
            console.log(`🚀 Server is listening on port ${env_1.env.PORT}`);
            await (0, admin_seed_1.seedSuperAdmin)();
            await (0, seed_data_1.seedAllData)();
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
// Graceful shutdown handlers
process.on('unhandledRejection', async (err) => {
    // console.log(`😈 Unhandled Rejection detected, shutting down...`, err);
    if (server) {
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            process.exit(1);
        });
    }
    else {
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
});
process.on('uncaughtException', async (err) => {
    // console.log(`😈 Uncaught Exception detected, shutting down...`, err);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});
// Handle SIGTERM (e.g., from Docker or cloud platforms)
process.on('SIGTERM', async () => {
    // console.log('🛑 SIGTERM received, shutting down gracefully...');
    if (server) {
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            // console.log('👋 Server closed');
            process.exit(0);
        });
    }
});
// Handle SIGINT (Ctrl+C)
process.on('SIGINT', async () => {
    // console.log('🛑 SIGINT received, shutting down gracefully...');
    if (server) {
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            // console.log('👋 Server closed');
            process.exit(0);
        });
    }
});
