import { NextFunction, Request, Response } from "express";
import {
  findAllPostWithPagination,
  findTotalsRecordPost,
} from "../services/post-service";

export async function index(req: Request, res: Response) {
  const { page, pagesize } = req.query;
  const post = await findAllPostWithPagination(Number(page), Number(pagesize));

  const totalrecord = await findTotalsRecordPost();
  return res.status(200).json({
    post: post,
    totalrecord: totalrecord,
  });
}
