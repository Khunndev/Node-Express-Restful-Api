import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    if (user && user.role === "Admin") {
      return next();
    } else {
      //return res.status(403).json({ message: "Restict : Admin only!" });
      const error: any = new Error("Restict : Admin only!");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const isPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    if (user && user.role === "Admin") {
      return next();
    } else {
      //return res.status(403).json({ message: "Restict : Admin only!" });
      const error: any = new Error("Restict : Admin only!");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

