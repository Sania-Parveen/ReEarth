// import express from "express";
// import { createBlog, getAllBlogs, getBlogById } from "../controllers/blogController.js";
// import upload from "../middleware/upload.js";


// const router = express.Router();

// router.post("/create", upload.single("image"), createBlog);
// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);

// export default router;

import express from "express";
import { createBlog, getAllBlogs, getBlogById, deleteBlog } from "../controllers/blogController.js"; // Import deleteBlog
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/create", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog); // New: Delete route


export default router;
