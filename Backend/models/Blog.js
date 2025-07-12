import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: String,
  description: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
