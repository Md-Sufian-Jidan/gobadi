export const authPaths = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description: "Register a new user with name, identifier (email/phone), password, and role.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "identifier", "password"],
              properties: {
                name: { type: "string", minLength: 1, example: "John Doe" },
                identifier: {
                  type: "string",
                  description: "Email or phone number",
                  example: "john@example.com",
                },
                password: {
                  type: "string",
                  minLength: 8,
                  maxLength: 100,
                  example: "password123",
                },
                role: {
                  type: "string",
                  enum: ["user", "doctor", "clinic", "admin"],
                  default: "user",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Registration successful",
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
                          user: { $ref: "#/components/schemas/User" },
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
        400: {
          description: "Validation error or user already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user",
      description: "Authenticate user with identifier (email/phone) and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["identifier", "password"],
              properties: {
                identifier: {
                  type: "string",
                  description: "Email or phone number",
                  example: "john@example.com",
                },
                password: { type: "string", minLength: 1, example: "password123" },
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
                          user: { $ref: "#/components/schemas/User" },
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
  "/api/v1/auth/send-otp": {
    post: {
      tags: ["Auth"],
      summary: "Send OTP",
      description: "Send a one-time password to the specified phone number or email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone"],
              properties: {
                phone: {
                  type: "string",
                  description: "Email or phone number",
                  example: "john@example.com",
                },
                purpose: {
                  type: "string",
                  enum: ["login", "verify", "reset"],
                  default: "login",
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
  "/api/v1/auth/verify-otp": {
    post: {
      tags: ["Auth"],
      summary: "Verify OTP",
      description: "Verify the one-time password sent to the user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone", "code"],
              properties: {
                phone: {
                  type: "string",
                  description: "Email or phone number",
                  example: "john@example.com",
                },
                code: { type: "string", minLength: 1, example: "123456" },
                purpose: {
                  type: "string",
                  enum: ["login", "verify", "reset"],
                  default: "login",
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
  "/api/v1/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Request password reset",
      description: "Send a password reset token to the user's email/phone.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["identifier"],
              properties: {
                identifier: {
                  type: "string",
                  description: "Email or phone number",
                  example: "john@example.com",
                },
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
  "/api/v1/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Reset password",
      description: "Reset user password using the reset token.",
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
  "/api/v1/auth/oauth/google": {
    post: {
      tags: ["Auth"],
      summary: "Google OAuth login",
      description: "Authenticate user via Google OAuth using a Google ID token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["idToken"],
              properties: {
                idToken: { type: "string", minLength: 1 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Google login successful",
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
                          user: { $ref: "#/components/schemas/User" },
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
  "/api/v1/auth/oauth/facebook": {
    post: {
      tags: ["Auth"],
      summary: "Facebook OAuth login",
      description: "Authenticate user via Facebook OAuth using an access token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["accessToken"],
              properties: {
                accessToken: { type: "string", minLength: 1 },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Facebook login successful",
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
                          user: { $ref: "#/components/schemas/User" },
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
  "/api/v1/auth/refresh": {
    post: {
      tags: ["Auth"],
      summary: "Refresh access token",
      description: "Generate a new access token using a valid refresh token.",
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
  "/api/v1/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user",
      description: "Invalidate the user's refresh token and log them out.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
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
  "/api/v1/auth/profile": {
    get: {
      tags: ["Auth"],
      summary: "Get current user profile",
      description: "Retrieve the authenticated user's profile information.",
      security: [{ bearerAuth: [] }, { cookieAuth: [] }],
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
                      data: { $ref: "#/components/schemas/User" },
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
};
