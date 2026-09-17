import swaggerJsdoc from "swagger-jsdoc";
import { authPaths } from "./auth.swagger";
import { userPaths } from "./user.swagger";
import { adminPaths } from "./admin.swagger";
import { notificationPaths } from "./notification.swagger";
import { dashboardPaths } from "./dashboard.swagger";
import { animalPaths } from "./animal.swagger";
import { searchPaths } from "./search.swagger";
import {
  successResponseSchema,
  errorResponseSchema,
  paginationMetaSchema,
  userSchema,
  adminSchema,
  notificationSchema,
} from "./common.swagger";

const healthDoc = {
  "/": {
    get: {
      tags: ["Health"],
      summary: "Health check",
      description: "Check if the server is running.",
      responses: {
        200: {
          description: "Server is running",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        properties: {
                          author: {
                            type: "object",
                            properties: {
                              name: { type: "string", example: "Gobadi" },
                              version: { type: "string", example: "1.0.0" },
                            },
                          },
                          host: { type: "string" },
                          time: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Gobadi Dashboard API",
      version: "1.0.0",
      description:
        "API documentation for the Gobadi Dashboard backend. This API provides endpoints for user management, admin management, authentication, notifications, dashboard analytics, animal management, and search functionality.",
      contact: {
        name: "Gobadi Team",
      },
    },
    servers: [
      {
        url: "http://localhost:7000",
        description: "Development server",
      },
      {
        url: "https://new-gobadi-backend.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description:
            "Enter: Bearer <your_jwt_token>",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT token stored in cookie",
        },
        adminBearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Admin JWT token: Bearer <admin_jwt_token>",
        },
        adminCookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "adminToken",
          description: "Admin JWT token stored in cookie",
        },
      },
      schemas: {
        SuccessResponse: successResponseSchema,
        ErrorResponse: errorResponseSchema,
        PaginationMeta: paginationMetaSchema,
        User: userSchema,
        Admin: adminSchema,
        Notification: notificationSchema,
      },
    },
    tags: [
      { name: "Health", description: "Health check endpoints" },
      { name: "Auth", description: "User authentication endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Admin Auth", description: "Admin authentication endpoints" },
      { name: "Admins", description: "Admin management endpoints (super_admin only)" },
      { name: "Notifications", description: "Notification management endpoints" },
      { name: "Dashboard", description: "Dashboard analytics endpoints" },
      { name: "Animals", description: "Animal management endpoints" },
      { name: "Search", description: "Global search endpoints" },
    ],
    paths: {
      ...healthDoc,
      ...authPaths,
      ...userPaths,
      ...adminPaths,
      ...notificationPaths,
      ...dashboardPaths,
      ...animalPaths,
      ...searchPaths,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
