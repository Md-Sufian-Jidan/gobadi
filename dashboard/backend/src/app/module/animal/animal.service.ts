import { prisma } from "../../lib/prisma";

interface AnimalOwner {
  name: string;
  tag: string;
  avatar: string | null;
}

interface AnimalListItem {
  id: number;
  animalTag: string;
  animalName: string;
  category: string;
  avatar: string | null;
  age: string;
  breed: string;
  gender: string;
  liveWeight: string;
  price: string;
  vaccinationDate: string;
  doctorVisit: string;
  owner: AnimalOwner;
}

interface PaginatedAnimals {
  data: AnimalListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getAllAnimals = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  filter?: string
): Promise<PaginatedAnimals> => {
  const currentPage = page > 0 ? page : 1;
  const pageSize = limit > 0 ? limit : 10;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" as const } },
      { breed: { contains: search, mode: "insensitive" as const } },
    ];
  }

  if (filter && filter !== "all") {
    where.breed = filter;
  }

  const [animals, total] = await Promise.all([
    prisma.animal.findMany({
      where,
      orderBy: { id: "asc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.animal.count({ where }),
  ]);

  const userIds = [...new Set(animals.map((a) => a.userId).filter(Boolean))] as number[];
  const users = userIds.length > 0
    ? await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, avatar: true },
    })
    : [];
  const userMap = new Map(users.map((u) => [u.id, u]));

  const data: AnimalListItem[] = animals.map((animal) => {
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

export const getAnimalById = async (
  id: number
): Promise<AnimalListItem | null> => {
  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) return null;

  let user = null;
  if (animal.userId) {
    user = await prisma.user.findUnique({
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

export const deleteAnimalById = async (id: number): Promise<boolean> => {
  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) return false;

  await prisma.animal.delete({ where: { id } });
  return true;
};
