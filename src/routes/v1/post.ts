import express from "express";
import { index } from "../../controllers/post-controller";

const router = express.Router();
router.get("/",index);  


export default router;
