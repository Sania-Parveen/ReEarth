import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blogController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/create", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

export default router;
