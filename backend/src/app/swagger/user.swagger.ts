export const userPaths = {
  "/api/v1/users/": {
    get: {
      tags: ["Users"],
      summary: "List all users",
      description: "Retrieve a paginated list of all users. Requires admin or super_admin role.",
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
          description: "Search by name, email, or phone",
        },
        {
          name: "role",
          in: "query",
          schema: { type: "string", enum: ["user", "doctor", "clinic", "admin"] },
          description: "Filter by role",
        },
      ],
      responses: {
        200: {
          description: "Users retrieved successfully",
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
                        items: { $ref: "#/components/schemas/User" },
                      },
                      meta: { $ref: "#/components/schemas/PaginationMeta" },
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
  },
  "/api/v1/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Get user by ID",
      description:
        "Retrieve a user by ID. Users can only access their own profile; admins can access any user.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "User ID",
        },
      ],
      responses: {
        200: {
          description: "User retrieved successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/User" },
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    put: {
      tags: ["Users"],
      summary: "Update user",
      description:
        "Update user information. Supports multipart/form-data for avatar upload. Users can update their own profile; admins can update any user.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "User ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", minLength: 2, maxLength: 100 },
                email: { type: "string", format: "email" },
                phone: { type: "string", minLength: 10, maxLength: 15 },
                avatar: { type: "string", format: "binary", description: "Avatar image file" },
                password: { type: "string", minLength: 6, maxLength: 100 },
                role: { type: "string", enum: ["user", "doctor", "clinic", "admin"] },
                verified: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/User" },
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
      tags: ["Users"],
      summary: "Delete user",
      description: "Delete a user by ID. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "User ID",
        },
      ],
      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "User not found",
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
