"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("prisma/config");
const env_1 = require("./src/app/config/env");
exports.default = (0, config_1.defineConfig)({
    schema: "prisma/schemas",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: env_1.env.DATABASE_URL,
    },
});
