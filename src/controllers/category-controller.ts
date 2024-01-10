import { NextFunction, Request, Response } from "express";
import {
  findAllCategory,
  findallCategoryWithPagination,
  findTotalsRecordCategory,
  findCategoryByID,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
  searchCategory,
} from "../services/category-service";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";
export async function index(req: Request, res: Response) {
  const { page, pagesize } = req.query;
  const category = await findallCategoryWithPagination(
    Number(page),
    Number(pagesize)
  );
  const totalrecord = await findTotalsRecordCategory();
  return res.status(200).json({
    category: category,
    totalrecord: totalrecord,
  });
}
type Category = {
  id: number;
  name: string;
};
export function create(req: Request, res: Response, next: NextFunction) {
  try {
    CreateCategory(req.body);
    return res.status(201).json({ message: "create category success" });
  } catch (error) {
    next(error);
  }
}

export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const category = await findCategoryByID(Number(id));
    if (!category) {
      const error: any = Error("category not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const categories = await findCategoryByID(Number(id));
  if (!categories) {
    return res.status(404).json({
      message: "category not found",
    });
  }

  const jsonBody = req.body as Prisma.CategoryUpdateInput;
  const updatedCategory = await UpdateCategory(+id, jsonBody);
  return res
    .status(200)
    .json({ message: "แก้ไขข้อมูลสำเร็จ", data: updatedCategory });
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const isCategory = await findCategoryByID(Number(id));
  findCategoryByID(Number(id));
  if (!isCategory) {
    return res.status(404).json({
      message: "category not found",
    });
  }
  DeleteCategory(Number(id));
  return res.status(200).json({ message: "delete category success" });
}

export async function search(req: Request, res: Response) {
  const { name } = req.query as any;
  //const category = await searchCategory(String(name));
  //custom model in db files
  const category = await prisma.category.searchCategoryByName(name);
  if (category.length == 0) {
    return res.status(404).json({
      message: "category not found",
    });
  }
  return res.status(200).json({ data: category, totals: category.length });
}
