export const searchPaths = {
  "/api/v1/search/": {
    get: {
      tags: ["Search"],
      summary: "Global search",
      description:
        "Search across farmers, doctors, animals, and notifications. Requires admin or super_admin role.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
      parameters: [
        {
          name: "q",
          in: "query",
          required: true,
          schema: { type: "string", minLength: 1 },
          description: "Search query string",
        },
      ],
      responses: {
        200: {
          description: "Search results retrieved successfully",
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
                          farmers: {
                            type: "array",
                            items: { $ref: "#/components/schemas/User" },
                          },
                          doctors: {
                            type: "array",
                            items: { $ref: "#/components/schemas/User" },
                          },
                          animals: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "integer" },
                                name: { type: "string" },
                                species: { type: "string" },
                              },
                            },
                          },
                          notifications: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Notification" },
                          },
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
