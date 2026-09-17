import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Middleware to validate request body using Zod schemas
export const validateRequest = (schema: ZodSchema) => {
  return (req: any, res: any, next: any): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
