import { NextFunction, Request, Response } from "express";
import {
  RegisterUser,
  checkUser,
  checkisExisitngUser,
  getUserDetailbyId,
} from "../services/user-service";
import { validationResult } from "express-validator";
import Jwt from "jsonwebtoken";
export async function index(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getUserDetailbyId(Number(id));
  return res.status(200).json(user);
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(422).json(validationError.array());
    }

    if (await checkisExisitngUser(req.body)) {
      return res
        .status(200)
        .json({ message: "Email is Existing in the system" });
    }
    RegisterUser(req.body);
    return res.status(200).json({
      message: "Register Success",
      date: req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(422).json(validationError.array());
    }
    if (!(await checkisExisitngUser(req.body))) {
      return res.status(404).json({ message: "Email is not Found" });
    }
    const userInfo = await checkUser(req.body.email, req.body.password);
    if (!userInfo) {
      return res.status(401).json({ message: "Password Incorrect" });
    } else {
      const jwt_key = process.env.JWT_KEY as any;
      const token = Jwt.sign(
        {
          user_id: userInfo.id,
          user_role: userInfo.role,
        },
        jwt_key,
        { expiresIn: "1m" }
      );

      const tokendecode = Jwt.decode(token) as any;
      return res.status(200).json({
        message: "Login Success",
        access_token: token,
        expire_in: tokendecode.exp,
      });
    }
  } catch (error) {
    next(error);
  }
}
