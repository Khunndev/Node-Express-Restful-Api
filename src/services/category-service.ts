import { Prisma } from "@prisma/client";
import { prisma } from "../db";
export async function findAllCategory() {
  const category = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  return category;
}

export async function findTotalsRecordCategory() {
  return await prisma.category.count();
}

export async function findCategoryByID(id: number) {
  return await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
}

export async function CreateCategory(data: Prisma.CategoryCreateInput) {
  const category = await prisma.category.create({
    data: data,
  });
  return category;
}

export async function DeleteCategory(id: number) {
  return await prisma.category.delete({
    where: {
      id: id,
    },
  });
}

export async function UpdateCategory(
  id: number,
  data: Prisma.CategoryUpdateInput
) {
  return await prisma.category.update({
    data: {
      name: data.name,
    },
    where: { id: id },
  });
}

// find with category name
export async function searchCategory(name: string) {
  return await prisma.category.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
}

export async function findallCategoryWithPagination(
  page: number,
  pagesize: number
) {
  return await prisma.category.findMany({
    skip: (page - 1) * pagesize,
    take: pagesize,
    orderBy: { id: "asc" },
  });
}

export async function findallCategoryRaw() {
  return await prisma.$queryRaw`SELECT * FROM category`;
}

export async function callStoreProcedure() {
  return await prisma.$executeRaw`exec [dbo].[spGetAllCategory]`;
}

