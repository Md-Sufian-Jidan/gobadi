"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnimalById = exports.getAnimalById = exports.getAllAnimals = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllAnimals = async (page = 1, limit = 10, search, filter) => {
    const currentPage = page > 0 ? page : 1;
    const pageSize = limit > 0 ? limit : 10;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { breed: { contains: search, mode: "insensitive" } },
        ];
    }
    if (filter && filter !== "all") {
        where.breed = filter;
    }
    const [animals, total] = await Promise.all([
        prisma_1.prisma.animal.findMany({
            where,
            orderBy: { id: "asc" },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma_1.prisma.animal.count({ where }),
    ]);
    const userIds = [...new Set(animals.map((a) => a.userId).filter(Boolean))];
    const users = userIds.length > 0
        ? await prisma_1.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true, avatar: true },
        })
        : [];
    const userMap = new Map(users.map((u) => [u.id, u]));
    const data = animals.map((animal) => {
        const user = animal.userId ? userMap.get(animal.userId) : null;
        return {
            id: animal.id,
            animalTag: `#${animal.id}`,
            animalName: animal.name,
            category: "N/A",
            avatar: animal.image,
            age: animal.age,
            breed: animal.breed,
            gender: "N/A",
            liveWeight: animal.weight ? `${animal.weight}` : "N/A",
            price: "N/A",
            vaccinationDate: "N/A",
            doctorVisit: "N/A",
            owner: {
                name: user?.name || "N/A",
                tag: animal.userId ? `#${animal.userId}` : "N/A",
                avatar: user?.avatar || null,
            },
        };
    });
    return {
        data,
        meta: {
            page: currentPage,
            limit: pageSize,
            total,
            totalPage: Math.ceil(total / pageSize),
        },
    };
};
exports.getAllAnimals = getAllAnimals;
const getAnimalById = async (id) => {
    const animal = await prisma_1.prisma.animal.findUnique({
        where: { id },
    });
    if (!animal)
        return null;
    let user = null;
    if (animal.userId) {
        user = await prisma_1.prisma.user.findUnique({
            where: { id: animal.userId },
            select: { id: true, name: true, avatar: true },
        });
    }
    return {
        id: animal.id,
        animalTag: `#${animal.id}`,
        animalName: animal.name,
        category: "N/A",
        avatar: animal.image,
        age: animal.age,
        breed: animal.breed,
        gender: "N/A",
        liveWeight: animal.weight ? `${animal.weight}` : "N/A",
        price: "N/A",
        vaccinationDate: "N/A",
        doctorVisit: "N/A",
        owner: {
            name: user?.name || "N/A",
            tag: animal.userId ? `#${animal.userId}` : "N/A",
            avatar: user?.avatar || null,
        },
    };
};
exports.getAnimalById = getAnimalById;
const deleteAnimalById = async (id) => {
    const animal = await prisma_1.prisma.animal.findUnique({ where: { id } });
    if (!animal)
        return false;
    await prisma_1.prisma.animal.delete({ where: { id } });
    return true;
};
exports.deleteAnimalById = deleteAnimalById;
