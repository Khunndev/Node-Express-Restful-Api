import { NextFunction, Request, Response } from "express";
import {
  CreatePost,
  findAllPostWithPagination,
  findTotalsRecordPost,
} from "../services/post-service";
import { validationResult } from "express-validator";

import { prisma } from "../db";

export async function index(req: Request, res: Response) {
  const { page, pagesize } = req.query;
  const post = await findAllPostWithPagination(Number(page), Number(pagesize));

  const totalrecord = await findTotalsRecordPost();
  return res.status(200).json({
    post: post,
    totalrecord: totalrecord,
  });
}


export async function publishPost(req: Request, res: Response,next:NextFunction) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(422).json(validationError.array());
    }
    CreatePost(req.body,req.user);
    return res.status(201).json({ message: "Create Post Success" });
  } catch (error) {
    next(error);
  }
}

