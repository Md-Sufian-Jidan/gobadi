import { Server } from 'http';
import app from './app';
import { env } from './app/config/env';
import { prisma } from './app/lib/prisma';
import { seedSuperAdmin } from './app/seed/admin.seed';
import { seedAllData } from './app/seed/seed.data';

let server: Server;

async function main() {
  try {
    await prisma.$connect();
    // console.log('🗃️  Database connected successfully');

    server = app.listen(env.PORT, async () => {
      // console.log(`🚀 Server is listening on port ${env.PORT}`);
      await seedSuperAdmin();
      await seedAllData();
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', async (err) => {
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    await prisma.$disconnect();
    process.exit(1);
  }
});

process.on('uncaughtException', async (err) => {
  await prisma.$disconnect();
  process.exit(1);
});

process.on('SIGTERM', async () => {
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }
});

process.on('SIGINT', async () => {
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }
});
