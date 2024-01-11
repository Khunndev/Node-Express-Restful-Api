import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { saveImageToDisk } from "./upload-service";
import { NextFunction } from "express";

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
export async function CreatePost(data: any, user: any) {
  try {
    const post = {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      photo: await saveImageToDisk(data.photo),
      userId: user.id,
    };

    await prisma.post.create({ data: post });
    // If no errors occurred during post creation, return true
    return true;
  } catch (error) {
    console.error('Error creating post:', error);
    // If an error occurred during post creation, return false
    return false;
  }
}
