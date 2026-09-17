export const animalPaths = {
  "/api/v1/animals/": {
    get: {
      tags: ["Animals"],
      summary: "List animals",
      description:
        "Retrieve a paginated list of animals. Requires admin or super_admin role.",
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
          description: "Search by animal name",
        },
        {
          name: "filter",
          in: "query",
          schema: { type: "string" },
          description: "Filter criteria",
        },
      ],
      responses: {
        200: {
          description: "Animals retrieved successfully",
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
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            species: { type: "string" },
                            breed: { type: "string" },
                            userId: { type: "integer" },
                            createdAt: { type: "string", format: "date-time" },
                          },
                        },
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
  "/api/v1/animals/{id}": {
    get: {
      tags: ["Animals"],
      summary: "Get animal by ID",
      description: "Retrieve an animal by its ID. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Animal ID",
        },
      ],
      responses: {
        200: {
          description: "Animal retrieved successfully",
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
                          id: { type: "integer" },
                          name: { type: "string" },
                          species: { type: "string" },
                          breed: { type: "string" },
                          userId: { type: "integer" },
                          createdAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        404: {
          description: "Animal not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Animals"],
      summary: "Delete animal",
      description: "Delete an animal by ID. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Animal ID",
        },
      ],
      responses: {
        200: {
          description: "Animal deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SuccessResponse" },
            },
          },
        },
        404: {
          description: "Animal not found",
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
