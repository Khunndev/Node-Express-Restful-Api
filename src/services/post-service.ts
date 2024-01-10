import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export async function findTotalsRecordPost() {
  return await prisma.post.count();
}
export async function findAllPostWithPagination(
  page: number,
  pagesize: number
) {
  return await prisma.post.findMany({
    skip: (page - 1) * pagesize,
    take: pagesize,
    select: {
      id: true,
      title: true,
      content: true,
      createAtToDate: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          fullname: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
