import express from "express";
// use express validator
import { body } from "express-validator";
import { index, login, register } from "../../controllers/user-controller";
const router = express.Router();

router.get("/:id", index);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters"),
  ],
  login
);
router.post(
  "/register",
  [
    body("firstname").notEmpty().withMessage("firstname is required"),
    body("lastname").notEmpty().withMessage("lastname is required"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters"),
  ],
  register
);

export default router;
