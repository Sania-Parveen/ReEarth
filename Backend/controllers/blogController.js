// import Blog from "../models/Blog.js";
// export const createBlog = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

//     const imageUrl = req.file.path; // Cloudinary image URL
//     const { caption, description, author } = req.body;

//     const blog = new Blog({ imageUrl, caption, description, author });
//     await blog.save();

//     res.status(201).json(blog);
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     res.status(500).json({ error: "Failed to create blog post" });
//   }
// };

// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch blogs" });
//   }
// };

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ error: "Blog not found" });
//     res.json(blog);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch blog" });
//   }
// };

import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const imageUrl = req.file.path; // Cloudinary image URL
    const { caption, description, author } = req.body;

    const blog = new Blog({ imageUrl, caption, description, author });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};



export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};
<<<<<<< HEAD
=======

// New: Delete Blog Post
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
