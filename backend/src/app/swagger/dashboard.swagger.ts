const periodParam = {
  name: "period",
  in: "query",
  schema: {
    type: "string",
    enum: ["last_7_days", "last_30_days", "this_year"],
    default: "last_7_days",
  },
  description: "Time period for data aggregation",
};

export const dashboardPaths = {
  "/api/v1/dashboard/stats": {
    get: {
      tags: ["Dashboard"],
      summary: "Get dashboard stats",
      description: "Retrieve overview statistics for the dashboard.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Stats retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/user-growth": {
    get: {
      tags: ["Dashboard"],
      summary: "Get user growth data",
      description: "Retrieve user growth statistics over time.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "User growth data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/user-os": {
    get: {
      tags: ["Dashboard"],
      summary: "Get user OS distribution",
      description: "Retrieve the distribution of users by operating system.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "OS distribution retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/ai-users": {
    get: {
      tags: ["Dashboard"],
      summary: "Get AI feature usage",
      description: "Retrieve statistics on AI feature usage by users.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "AI usage data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/appointments": {
    get: {
      tags: ["Dashboard"],
      summary: "Get appointment stats",
      description: "Retrieve appointment statistics.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Appointment stats retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/retention": {
    get: {
      tags: ["Dashboard"],
      summary: "Get user retention data",
      description: "Retrieve user retention statistics.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Retention data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/user-list-stats": {
    get: {
      tags: ["Dashboard"],
      summary: "Get user list statistics",
      description: "Retrieve user list statistics for the dashboard.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "User list stats retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/user-location": {
    get: {
      tags: ["Dashboard"],
      summary: "Get user location distribution",
      description: "Retrieve the geographic distribution of users.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        periodParam,
        {
          name: "role",
          in: "query",
          schema: { type: "string", enum: ["user", "doctor", "clinic"] },
          description: "Filter by user role",
        },
        {
          name: "filter",
          in: "query",
          schema: { type: "string" },
          description: "Additional filter criteria",
        },
      ],
      responses: {
        200: {
          description: "Location distribution retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/daily-users": {
    get: {
      tags: ["Dashboard"],
      summary: "Get daily active users",
      description: "Retrieve daily active user statistics.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Daily users data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/registered-animals": {
    get: {
      tags: ["Dashboard"],
      summary: "Get registered animals count",
      description: "Retrieve the count of registered animals.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Registered animals count retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/task-feature-users": {
    get: {
      tags: ["Dashboard"],
      summary: "Get task feature usage",
      description: "Retrieve statistics on task feature usage by users.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [periodParam],
      responses: {
        200: {
          description: "Task feature usage data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/farmers": {
    get: {
      tags: ["Dashboard"],
      summary: "List farmers",
      description: "Retrieve a paginated list of farmers.",
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
          description: "Search by name or phone",
        },
        {
          name: "status",
          in: "query",
          schema: { type: "string" },
          description: "Filter by status",
        },
      ],
      responses: {
        200: {
          description: "Farmers retrieved successfully",
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
      },
    },
  },
  "/api/v1/dashboard/farmers/{id}": {
    get: {
      tags: ["Dashboard"],
      summary: "Get farmer by ID",
      description: "Retrieve a farmer by their ID.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Farmer ID",
        },
      ],
      responses: {
        200: {
          description: "Farmer retrieved successfully",
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
          description: "Farmer not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Dashboard"],
      summary: "Delete farmer",
      description: "Delete a farmer by ID.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Farmer ID",
        },
      ],
      responses: {
        200: {
          description: "Farmer deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "Farmer not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/dashboard/doctors": {
    get: {
      tags: ["Dashboard"],
      summary: "List doctors",
      description: "Retrieve a paginated list of doctors.",
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
          description: "Search by name or phone",
        },
        {
          name: "status",
          in: "query",
          schema: { type: "string" },
          description: "Filter by status",
        },
      ],
      responses: {
        200: {
          description: "Doctors retrieved successfully",
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
      },
    },
  },
  "/api/v1/dashboard/doctors/{id}": {
    get: {
      tags: ["Dashboard"],
      summary: "Get doctor by ID",
      description: "Retrieve a doctor by their ID.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Doctor ID",
        },
      ],
      responses: {
        200: {
          description: "Doctor retrieved successfully",
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
          description: "Doctor not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Dashboard"],
      summary: "Delete doctor",
      description: "Delete a doctor by ID.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Doctor ID",
        },
      ],
      responses: {
        200: {
          description: "Doctor deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "Doctor not found",
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
