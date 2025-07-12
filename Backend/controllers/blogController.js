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

