import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blogController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/create", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

export default router;
//blogRoutes.js or wherever you define the POST route
// const express = require('express');
// const multer = require('multer');
// const router = express.Router();

// // Sample multer config (you may be using Cloudinary with multer storage instead)
// const upload = multer({ dest: 'uploads/' });

// // Expecting a field called 'image'
// router.post('/create', upload.single('image'), blogController.createBlog);
