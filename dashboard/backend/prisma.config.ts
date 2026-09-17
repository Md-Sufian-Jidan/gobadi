import "dotenv/config";
import { defineConfig } from "prisma/config";
import { env } from "./src/app/config/env";

export default defineConfig({
  schema: "prisma/schemas",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});