"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnimal = exports.getAnimal = exports.listAnimals = void 0;
const animal_service_1 = require("./animal.service");
const sendResponse_1 = require("../../utils/sendResponse");
const listAnimals = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const search = req.query.search || undefined;
        const filter = req.query.filter || undefined;
        const result = await (0, animal_service_1.getAllAnimals)(page, limit, search, filter);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Animals retrieved successfully",
            data: result.data,
            meta: result.meta,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listAnimals = listAnimals;
const getAnimal = async (req, res, next) => {
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
        const animal = await (0, animal_service_1.getAnimalById)(id);
        if (!animal) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Animal not found",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Animal retrieved successfully",
            data: animal,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnimal = getAnimal;
const deleteAnimal = async (req, res, next) => {
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
        const deleted = await (0, animal_service_1.deleteAnimalById)(id);
        if (!deleted) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Animal not found",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Animal deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAnimal = deleteAnimal;
