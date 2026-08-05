import { Server } from 'http';
import app from './app';
import { env } from './app/config/env';
import connectDB from './app/config/connectDB';

let server: Server;

async function main() {
  try {
    await connectDB();
    server = app.listen(env.port, () => {
      console.log(`🚀 Server is listening on port ${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

main();

const shutdown = (code = 0) => {
  if (server) {
    server.close(() => {
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
process.on("unhandledRejection", (err) => {
  console.error(err);
  shutdown(1);
});
process.on("uncaughtException", (err) => {
  console.error(err);
  shutdown(1);
});