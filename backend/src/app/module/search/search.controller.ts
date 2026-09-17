import { Request, Response, NextFunction } from "express";
import { globalSearch } from "./search.service";
import { sendResponse } from "../../utils/sendResponse";

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const q = (req.query.q as string) || "";

    if (q.trim().length < 2) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Search query too short",
        data: { farmers: [], doctors: [], animals: [], notifications: [] },
      });
      return;
    }

    const data = await globalSearch(q);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Search results retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
