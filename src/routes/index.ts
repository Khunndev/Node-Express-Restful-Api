import express, { Request, Response } from "express";

const router = express.Router();

// localhost:4000/
router.get("/", function (_: Request, res: Response) {
  return res.status(200).json({ message: "Hello API Index" });
});

// localhost:4000/version
router.get("/version", function (_: Request, res: Response) {
  return res.status(200).json({ version: "v1.0.0" });
});

export default router;
