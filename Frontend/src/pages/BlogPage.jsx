import React, { useState, useEffect } from "react";
import CreateBlogPostForm from "../components/CreateBlogPostForm";
import BlogPostCard from "../components/BlogPostCard";
import blogBackground from "../assets/blogBackground.jpg"; // Import the background image

// Import all necessary API functions, including deleteBlog
import { getBlogs, createBlog as createBlogPostApi, deleteBlog } from "/api.js";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBlogs();
      setBlogPosts(response.data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // const handleCreatePost = async (newPostData) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('caption', newPostData.title);
  //     formData.append('description', newPostData.description);
  //     formData.append('author', newPostData.author);
  //     if (newPostData.pictureFile) {
  //       formData.append('image', newPostData.pictureFile);
  //     }

  //     await createBlogPostApi(formData);
  //     fetchBlogPosts();
  //     setShowCreateForm(false);
  //   } catch (err) {
  //     console.error('Error creating blog post:', err);
  //     setError(`Failed to create blog post: ${err.response?.data?.error || err.message}`);
  //   }
  // };
  const handleCreatePost = async (newPostData) => {
    try {
      const formData = new FormData();
      formData.append("caption", newPostData.title);
      formData.append("description", newPostData.description);
      formData.append("author", newPostData.author);
      if (newPostData.pictureFile) {
        formData.append("image", newPostData.pictureFile);
      }

      const response = await createBlogPostApi(formData);

      // 👇 Optimistically add the new blog post to state without needing full fetch
      const newBlog = response.data.blog; // Assuming backend returns created blog under 'blog'

      if (newBlog) {
        setBlogPosts((prevPosts) => [newBlog, ...prevPosts]);
      } else {
        // fallback: refetch if response is incomplete
        await fetchBlogPosts();
      }

      setShowCreateForm(false);
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError(
        `Failed to create blog post: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deleteBlog(id);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      console.log(`Blog post with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError(
        `Failed to delete blog post: ${
          err.response?.data?.message || err.message
        }`
      );
      fetchBlogPosts();
    }
  };

  return (
    // Outer container with the background image
    <div
      className="min-h-screen font-sans bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${blogBackground})` }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="min-h-screen bg-white/80 backdrop-blur-sm px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className="text-5xl font-extrabold text-emerald-800 mb-6 md:mb-0 drop-shadow-md">
              🍃 Our Green Blog
            </h1>
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  New Nature Post
                </span>
              </button>
            )}
          </div>

          {showCreateForm && (
            <div className="mb-12 p-8 bg-white/90 rounded-3xl shadow-2xl border border-green-100">
              <CreateBlogPostForm
                onSubmit={handleCreatePost}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          )}

          {loading && (
            <p className="text-center text-emerald-700 text-xl py-10">
              🌿 Sprouting new posts...
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 bg-red-100 border border-red-200 p-4 rounded-lg text-lg my-8">
              {error}
            </p>
          )}

          {!loading && !error && blogPosts.length === 0 && (
            <p className="text-center text-emerald-600 text-xl py-10">
              No seeds planted yet. Be the first to grow a post!
            </p>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!loading &&
              !error &&
              blogPosts.map((post) => (
                <BlogPostCard
                  key={post._id}
                  post={{
                    id: post._id,
                    title: post.caption,
                    author: post.author,
                    description: post.description,
                    imageUrl: post.imageUrl,
                    createdAt: post.createdAt,
                  }}
                  onDelete={handleDeletePost}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
