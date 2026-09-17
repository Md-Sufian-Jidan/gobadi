export const successResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean", example: true },
    statusCode: { type: "integer", example: 200 },
    message: { type: "string", example: "Operation successful" },
    data: { description: "Response data" },
    meta: { $ref: "#/components/schemas/PaginationMeta" },
  },
};

export const errorResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean", example: false },
    statusCode: { type: "integer", example: 400 },
    message: { type: "string", example: "Something went wrong" },
    errorSources: {
      type: "array",
      items: {
        type: "object",
        properties: {
          path: { type: "string", example: "body.email" },
          message: { type: "string", example: "Invalid email format" },
        },
      },
    },
  },
};

export const paginationMetaSchema = {
  type: "object",
  properties: {
    page: { type: "integer", example: 1 },
    limit: { type: "integer", example: 10 },
    total: { type: "integer", example: 100 },
    totalPage: { type: "integer", example: 10 },
  },
};

export const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "John Doe" },
    email: { type: "string", nullable: true, example: "john@example.com" },
    phone: { type: "string", nullable: true, example: "+1234567890" },
    avatar: { type: "string", nullable: true },
    role: { type: "string", enum: ["user", "doctor", "clinic", "admin"], example: "user" },
    verified: { type: "boolean", example: false },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

export const adminSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "Admin User" },
    email: { type: "string", example: "admin@gobadi.com" },
    avatar: { type: "string", nullable: true },
    role: { type: "string", enum: ["admin", "super_admin"], example: "admin" },
    designation: {
      type: "string",
      enum: ["founder", "co-founder", "manager", "developer", "analyst", "support"],
      example: "manager",
    },
    status: { type: "string", enum: ["active", "deactive"], example: "active" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

export const notificationSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    title: { type: "string", example: "New Appointment" },
    body: { type: "string", example: "You have a new appointment scheduled" },
    type: {
      type: "string",
      enum: [
        "order", "booking", "payment", "delivery", "reminder",
        "ai_ready", "prescription_ready", "promotion", "system",
        "message", "referral",
      ],
      example: "system",
    },
    read: { type: "boolean", example: false },
    userId: { type: "integer", example: 1 },
    referenceType: { type: "string", nullable: true },
    referenceId: { type: "string", nullable: true },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};
