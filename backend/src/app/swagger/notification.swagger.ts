export const notificationPaths = {
  "/api/v1/notifications/unread-count": {
    get: {
      tags: ["Notifications"],
      summary: "Get unread notification count",
      description: "Retrieve the count of unread notifications for the current user.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      responses: {
        200: {
          description: "Unread count retrieved successfully",
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
                          count: { type: "integer", example: 5 },
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
  "/api/v1/notifications/": {
    get: {
      tags: ["Notifications"],
      summary: "List all notifications",
      description:
        "Retrieve a paginated list of all notifications. Requires admin or super_admin role.",
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
          description: "Search by title or body",
        },
        {
          name: "type",
          in: "query",
          schema: {
            type: "string",
            enum: [
              "order", "booking", "payment", "delivery", "reminder",
              "ai_ready", "prescription_ready", "promotion", "system",
              "message", "referral",
            ],
          },
          description: "Filter by notification type",
        },
      ],
      responses: {
        200: {
          description: "Notifications retrieved successfully",
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
                        items: { $ref: "#/components/schemas/Notification" },
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
    post: {
      tags: ["Notifications"],
      summary: "Create notification",
      description: "Create a notification for a specific user. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "body", "userId"],
              properties: {
                title: { type: "string", minLength: 1, example: "New Appointment" },
                body: {
                  type: "string",
                  minLength: 1,
                  example: "You have a new appointment scheduled",
                },
                type: {
                  type: "string",
                  enum: [
                    "order", "booking", "payment", "delivery", "reminder",
                    "ai_ready", "prescription_ready", "promotion", "system",
                    "message", "referral",
                  ],
                  default: "system",
                },
                userId: { type: "integer", minimum: 1, example: 1 },
                referenceType: { type: "string" },
                referenceId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Notification created successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Notification" },
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
  "/api/v1/notifications/user": {
    get: {
      tags: ["Notifications"],
      summary: "Get user notifications",
      description: "Retrieve notifications for the currently authenticated user.",
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
      ],
      responses: {
        200: {
          description: "User notifications retrieved successfully",
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
                        items: { $ref: "#/components/schemas/Notification" },
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
  "/api/v1/notifications/{id}": {
    get: {
      tags: ["Notifications"],
      summary: "Get notification by ID",
      description: "Retrieve a single notification by ID. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Notification ID",
        },
      ],
      responses: {
        200: {
          description: "Notification retrieved successfully",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/SuccessResponse" },
                  {
                    type: "object",
                    properties: {
                      data: { $ref: "#/components/schemas/Notification" },
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: "Notification not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Notifications"],
      summary: "Delete notification",
      description: "Delete a notification by ID. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Notification ID",
        },
      ],
      responses: {
        200: {
          description: "Notification deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "Notification not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/notifications/send": {
    post: {
      tags: ["Notifications"],
      summary: "Send notification to multiple users",
      description:
        "Send a notification to multiple specific users. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "body", "userIds"],
              properties: {
                title: { type: "string", minLength: 1, example: "System Update" },
                body: {
                  type: "string",
                  minLength: 1,
                  example: "Scheduled maintenance tonight",
                },
                type: {
                  type: "string",
                  enum: [
                    "order", "booking", "payment", "delivery", "reminder",
                    "ai_ready", "prescription_ready", "promotion", "system",
                    "message", "referral",
                  ],
                  default: "system",
                },
                userIds: {
                  type: "array",
                  items: { type: "integer", minimum: 1 },
                  minItems: 1,
                  example: [1, 2, 3],
                },
                referenceType: { type: "string" },
                referenceId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Notification sent successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/notifications/broadcast": {
    post: {
      tags: ["Notifications"],
      summary: "Broadcast notification",
      description:
        "Broadcast a notification to all users of a specific role. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "body"],
              properties: {
                title: { type: "string", minLength: 1, example: "Global Announcement" },
                body: {
                  type: "string",
                  minLength: 1,
                  example: "New features available!",
                },
                type: {
                  type: "string",
                  enum: [
                    "order", "booking", "payment", "delivery", "reminder",
                    "ai_ready", "prescription_ready", "promotion", "system",
                    "message", "referral",
                  ],
                  default: "system",
                },
                role: {
                  type: "string",
                  enum: ["user", "doctor", "clinic", "admin"],
                  description: "Target role (broadcast to all if omitted)",
                },
                occurrence: { type: "string" },
                time: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Notification broadcasted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/notifications/{id}/read": {
    patch: {
      tags: ["Notifications"],
      summary: "Mark notification as read",
      description: "Mark a specific notification as read.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Notification ID",
        },
      ],
      responses: {
        200: {
          description: "Notification marked as read",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/notifications/read-all": {
    patch: {
      tags: ["Notifications"],
      summary: "Mark all notifications as read",
      description: "Mark all notifications for the current user as read.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      responses: {
        200: {
          description: "All notifications marked as read",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
};
