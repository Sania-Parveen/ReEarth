// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import CreateBlogPostForm from '../components/CreateBlogPostForm';
import BlogPostCard from '../components/BlogPostCard';

// Import all necessary API functions, including deleteBlog
import { getBlogs, createBlog as createBlogPostApi, deleteBlog } from '../../api.js';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBlogs(); // Use axios getBlogs function
      setBlogPosts(response.data); // Axios puts the response data in .data
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleCreatePost = async (newPostData) => {
    try {
      const formData = new FormData();
      formData.append('caption', newPostData.title); // Your backend expects 'caption' for title
      formData.append('description', newPostData.description);
      formData.append('author', newPostData.author);
      if (newPostData.pictureFile) {
        formData.append('image', newPostData.pictureFile); // 'image' is the field name your backend expects for the file
      }

      await createBlogPostApi(formData); // Use axios createBlog function

      // After successful creation, re-fetch all blogs to update the list
      fetchBlogPosts();
      setShowCreateForm(false); // Hide the form after submission
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(`Failed to create blog post: ${err.response?.data?.error || err.message}`);
    }
  };

  // New: Handle Delete Post
  const handleDeletePost = async (id) => {
    // Removed window.confirm as it's not supported in this environment.
    // In a real application, you'd replace this with a custom modal.
    try {
      await deleteBlog(id); // Call the deleteBlog API function
      // Optimistically update the UI by filtering out the deleted post
      setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      console.log(`Blog post with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError(`Failed to delete blog post: ${err.response?.data?.message || err.message}`);
      // If deletion fails, re-fetch to ensure state consistency with the backend
      fetchBlogPosts();
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">📚 Our Blog</h1>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
              + New Post
            </button>
          )}
        </div>

        {showCreateForm && (
          <div className="mb-8">
            <CreateBlogPostForm
              onSubmit={handleCreatePost}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {loading && <p className="text-center text-gray-600">Loading blog posts...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && blogPosts.length === 0 && (
          <p className="text-center text-gray-600">No blog posts found. Be the first to create one!</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!loading && !error && blogPosts.map((post) => (
            <BlogPostCard
              key={post._id} // Use MongoDB's _id as key
              post={{
                id: post._id, // Pass _id as 'id' for the delete function
                title: post.caption, // Map backend 'caption' to frontend 'title'
                author: post.author,
                description: post.description,
                imageUrl: post.imageUrl, // This will be the Cloudinary URL
                createdAt: post.createdAt, // Pass createdAt to the card
              }}
              onDelete={handleDeletePost} // Pass the delete handler to the card
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
