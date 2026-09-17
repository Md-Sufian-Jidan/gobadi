import { Request, Response, NextFunction, RequestHandler } from "express";

export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};