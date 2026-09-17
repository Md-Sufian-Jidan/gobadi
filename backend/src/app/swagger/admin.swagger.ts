export const adminPaths = {
  // ========== Admin Auth Routes ==========
  "/api/v1/admins/login": {
    post: {
      tags: ["Admin Auth"],
      summary: "Admin login",
      description: "Authenticate admin with email and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email", example: "admin@gobadi.com" },
                password: { type: "string", minLength: 1, example: "admin123" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
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
                          admin: { $ref: "#/components/schemas/Admin" },
                          accessToken: { type: "string" },
                          refreshToken: { type: "string" },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/send-otp": {
    post: {
      tags: ["Admin Auth"],
      summary: "Send admin OTP",
      description: "Send a one-time password to the admin's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", format: "email", example: "admin@gobadi.com" },
                purpose: {
                  type: "string",
                  enum: ["verify", "reset"],
                  default: "verify",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "OTP sent successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/verify-otp": {
    post: {
      tags: ["Admin Auth"],
      summary: "Verify admin OTP",
      description: "Verify the one-time password sent to the admin's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "code"],
              properties: {
                email: { type: "string", format: "email", example: "admin@gobadi.com" },
                code: { type: "string", minLength: 1, example: "123456" },
                purpose: {
                  type: "string",
                  enum: ["verify", "reset"],
                  default: "verify",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "OTP verified successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        400: {
          description: "Invalid or expired OTP",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/forgot-password": {
    post: {
      tags: ["Admin Auth"],
      summary: "Request admin password reset",
      description: "Send a password reset token to the admin's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", format: "email", example: "admin@gobadi.com" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Reset token sent",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/reset-password": {
    post: {
      tags: ["Admin Auth"],
      summary: "Reset admin password",
      description: "Reset admin password using the reset token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["resetToken", "newPassword"],
              properties: {
                resetToken: { type: "string", minLength: 1 },
                newPassword: {
                  type: "string",
                  minLength: 8,
                  maxLength: 100,
                  example: "newpassword123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/refresh": {
    post: {
      tags: ["Admin Auth"],
      summary: "Refresh admin access token",
      description: "Generate a new access token using a valid admin refresh token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refreshToken"],
              properties: {
                refreshToken: { type: "string", minLength: 1 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Token refreshed successfully",
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
                          accessToken: { type: "string" },
                          refreshToken: { type: "string" },
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
  "/api/v1/admins/logout": {
    post: {
      tags: ["Admin Auth"],
      summary: "Logout admin",
      description: "Invalidate the admin's refresh token and log them out.",
      security: [{ adminBearerAuth: [] }, { adminCookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refreshToken"],
              properties: {
                refreshToken: { type: "string", minLength: 1 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/profile": {
    get: {
      tags: ["Admin Auth"],
      summary: "Get admin profile",
      description: "Retrieve the authenticated admin's profile information.",
      security: [{ adminBearerAuth: [] }, { adminCookieAuth: [] }],
      responses: {
        200: {
          description: "Profile retrieved successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Admin Auth"],
      summary: "Update admin profile",
      description:
        "Update the authenticated admin's profile. Supports multipart/form-data for avatar upload.",
      security: [{ adminBearerAuth: [] }, { adminCookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", minLength: 1 },
                designation: {
                  type: "string",
                  enum: ["founder", "co-founder", "manager", "developer", "analyst", "support"],
                },
                password: { type: "string", minLength: 6, maxLength: 100 },
                avatar: { type: "string", format: "binary", description: "Avatar image file" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
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
  // ========== Admin CRUD Routes ==========
  "/api/v1/admins/": {
    post: {
      tags: ["Admins"],
      summary: "Create admin",
      description: "Create a new admin account. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password", "designation"],
              properties: {
                name: { type: "string", minLength: 1, example: "New Admin" },
                email: { type: "string", format: "email", example: "newadmin@gobadi.com" },
                password: { type: "string", minLength: 6, maxLength: 100 },
                role: {
                  type: "string",
                  enum: ["admin", "super_admin"],
                  default: "admin",
                },
                designation: {
                  type: "string",
                  enum: ["founder", "co-founder", "manager", "developer", "analyst", "support"],
                },
                avatar: { type: "string", format: "uri" },
                status: {
                  type: "string",
                  enum: ["active", "deactive"],
                  default: "active",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Admin created successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        400: {
          description: "Validation error or admin already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    get: {
      tags: ["Admins"],
      summary: "List all admins",
      description: "Retrieve a paginated list of all admins. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1, minimum: 1 },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10, minimum: 1 },
          description: "Items per page",
        },
        {
          name: "search",
          in: "query",
          schema: { type: "string" },
          description: "Search by name or email",
        },
        {
          name: "role",
          in: "query",
          schema: { type: "string", enum: ["admin", "super_admin"] },
          description: "Filter by role",
        },
        {
          name: "status",
          in: "query",
          schema: { type: "string", enum: ["active", "deactive"] },
          description: "Filter by status",
        },
      ],
      responses: {
        200: {
          description: "Admins retrieved successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Admin" },
                      },
                      meta: { $ref: "#/components/schemas/PaginationMeta" },
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
  "/api/v1/admins/{id}": {
    get: {
      tags: ["Admins"],
      summary: "Get admin by ID",
      description: "Retrieve an admin by their ID. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Admin ID",
        },
      ],
      responses: {
        200: {
          description: "Admin retrieved successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    put: {
      tags: ["Admins"],
      summary: "Update admin",
      description: "Update admin information. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Admin ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", minLength: 1 },
                email: { type: "string", format: "email" },
                password: { type: "string", minLength: 6, maxLength: 100 },
                role: { type: "string", enum: ["admin", "super_admin"] },
                designation: {
                  type: "string",
                  enum: ["founder", "co-founder", "manager", "developer", "analyst", "support"],
                },
                avatar: { type: "string", format: "uri" },
                status: { type: "string", enum: ["active", "deactive"] },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Admin updated successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Admins"],
      summary: "Delete admin",
      description: "Delete an admin by ID. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Admin ID",
        },
      ],
      responses: {
        200: {
          description: "Admin deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/admins/{id}/deactivate": {
    patch: {
      tags: ["Admins"],
      summary: "Toggle admin status",
      description:
        "Toggle an admin's status between active and deactive. Requires super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Admin ID",
        },
      ],
      responses: {
        200: {
          description: "Admin status toggled successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Admin" },
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
