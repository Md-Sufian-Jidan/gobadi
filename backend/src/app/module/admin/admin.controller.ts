import { Request, Response, NextFunction } from "express";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  deactivateAdmin,
} from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const getParamId = (id: string | string[]): string =>
  Array.isArray(id) ? id[0] : id;

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await createAdmin(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const result = await getAllAdmins(page, limit);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admins retrieved successfully",
      data: result.admins,
      meta: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    const result = await getAdminById(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    const result = await updateAdmin(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    await deleteAdmin(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    const result = await deactivateAdmin(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin status toggled successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
