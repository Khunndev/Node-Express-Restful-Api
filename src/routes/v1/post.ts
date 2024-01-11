import express from "express";
import { index, publishPost } from "../../controllers/post-controller";
import { isAuthen } from "../../middleware/jwt-authen";
import { isAdmin } from "../../middleware/is-role";
import { body } from "express-validator";

const router = express.Router();
router.get("/", index);
router.post(
  "/",
  [
    isAuthen,
    isAdmin,
    body("title").notEmpty().withMessage("title is required"),
    body("content").notEmpty().withMessage("content is required"),
    body("categoryId")
      .notEmpty()
      .withMessage("categoryId is required")
      .isNumeric()
      .withMessage("categoryId is required as Number"),
  ],
  publishPost
);

export default router;
