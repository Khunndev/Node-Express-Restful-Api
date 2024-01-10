import express from "express";
import { create, index, remove, search, show, update } from "../../controllers/category-controller";
const router = express.Router();

// localhost:4000/
router.get("/search",search); // get category
router.get("/",index);      // get all categories
router.post("/",create);    // post new category
router.get("/:id",show);    // get category
router.put("/:id",update);  // update category
router.delete("/:id",remove); // update category
export default router;
