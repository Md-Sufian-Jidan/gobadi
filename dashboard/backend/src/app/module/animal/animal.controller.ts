import { Request, Response, NextFunction } from "express";
import { getAllAnimals, getAnimalById, deleteAnimalById } from "./animal.service";
import { sendResponse } from "../../utils/sendResponse";

export const listAnimals = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || undefined;
    const filter = (req.query.filter as string) || undefined;

    const result = await getAllAnimals(page, limit, search, filter);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Animals retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnimal = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid animal ID",
        data: null,
      });
      return;
    }

    const animal = await getAnimalById(id);
    if (!animal) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Animal not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Animal retrieved successfully",
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnimal = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid animal ID",
        data: null,
      });
      return;
    }

    const deleted = await deleteAnimalById(id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Animal not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Animal deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
