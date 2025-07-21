// src/api.js

// import axios from "axios";

// // Base URL from .env file or fallback
// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// export const API = {
//   BASE_URL,

//   // Auth Endpoints
//   SIGNUP: `${BASE_URL}/api/auth/signup`,
//   LOGIN: `${BASE_URL}/api/auth/login`,

//   // Blog Endpoints
//   CREATE_BLOG: `${BASE_URL}/api/blogs/create`,
//   GET_BLOGS: `${BASE_URL}/api/blogs`,
//   GET_BLOG_BY_ID: (id) => `${BASE_URL}/api/blogs/${id}`,

//   // Event Endpoints
//   CREATE_EVENT: `${BASE_URL}/api/events/create`,
//   GET_EVENTS: `${BASE_URL}/api/events`,
//   JOIN_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}/join`,
//   GET_EVENT_BY_ID: (eventId) => `${BASE_URL}/api/events/${eventId}`,
//   LOG_WASTE: (eventId) => `${BASE_URL}/api/events/${eventId}/waste`,
//   DELETE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,
//   UPDATE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,

//   // Gemini AI
//   GENERATE_STORY: `${BASE_URL}/generate-story`,
// };

// // --- Axios Call Functions ---

// // Auth
// export const signup = (formData) => axios.post(API.SIGNUP, formData);
// export const login = (formData) => axios.post(API.LOGIN, formData);

// // Blog
// export const createBlog = (formData) => axios.post(API.CREATE_BLOG, formData);
// export const getBlogs = () => axios.get(API.GET_BLOGS);
// export const getBlogById = (id) => axios.get(API.GET_BLOG_BY_ID(id));

// // Events
// export const getEvents = () => axios.get(API.GET_EVENTS);
// export const createEvent = (eventData) => axios.post(API.CREATE_EVENT, eventData);
// export const joinEvent = (eventId, userId) =>
//   axios.post(API.JOIN_EVENT(eventId), { userId });

// export const getEventById = (eventId) => axios.get(API.GET_EVENT_BY_ID(eventId));
// export const logWaste = (eventId, data) => axios.post(API.LOG_WASTE(eventId), data);

// // 🔥 New: Delete and Update
// export const deleteEvent = (eventId) => axios.delete(API.DELETE_EVENT(eventId));
// export const updateEvent = (eventId, updatedData) =>
//   axios.put(API.UPDATE_EVENT(eventId), updatedData);

// // Gemini
// export const generateStory = (data) => axios.post(API.GENERATE_STORY, data);
// src/api.js

import axios from "axios";

// ✅ Base URL from .env or fallback
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// ✅ All API Endpoints
export const API = {
  BASE_URL,

  // --- Auth Endpoints ---
  SIGNUP: `${BASE_URL}/api/auth/signup`,
  LOGIN: `${BASE_URL}/api/auth/login`,

  // --- Blog Endpoints ---
  CREATE_BLOG: `${BASE_URL}/api/blogs/create`,
  GET_BLOGS: `${BASE_URL}/api/blogs`,
  GET_BLOG_BY_ID: (id) => `${BASE_URL}/api/blogs/${id}`,
  DELETE_BLOG: (id) => `${BASE_URL}/api/blogs/${id}`,


  // --- Event Endpoints ---
  CREATE_EVENT: `${BASE_URL}/api/events/create`,
  GET_EVENTS: `${BASE_URL}/api/events`,
  GET_EVENT_BY_ID: (eventId) => `${BASE_URL}/api/events/${eventId}`,
  JOIN_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}/join`,
  LOG_WASTE: (eventId) => `${BASE_URL}/api/events/${eventId}/waste`,
  DELETE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,
  UPDATE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,

  // --- Gemini AI ---
  GENERATE_STORY: `${BASE_URL}/generate-story`,
};

// ✅ Axios Call Functions

// --- Auth ---
export const signup = (formData) => axios.post(API.SIGNUP, formData);
export const login = (formData) => axios.post(API.LOGIN, formData);

// --- Blog ---
export const createBlog = (formData) => axios.post(API.CREATE_BLOG, formData);
export const getBlogs = () => axios.get(API.GET_BLOGS);
export const getBlogById = (id) => axios.get(API.GET_BLOG_BY_ID(id));
export const deleteBlog = (id) => axios.delete(`${API.BASE_URL}/api/blogs/${id}`);


// --- Events ---
export const getEvents = () => axios.get(API.GET_EVENTS);
export const createEvent = (eventData) => axios.post(API.CREATE_EVENT, eventData);
export const getEventById = (eventId) => axios.get(API.GET_EVENT_BY_ID(eventId));
export const joinEvent = (eventId, userId) =>
  axios.post(`${BASE_URL}/api/events/${eventId}/join`, { userId });

export const logWaste = (eventId, data) =>
  axios.post(API.LOG_WASTE(eventId), data);
export const deleteEvent = (eventId) =>
  axios.delete(API.DELETE_EVENT(eventId));
export const updateEvent = (eventId, updatedData) =>
  axios.put(API.UPDATE_EVENT(eventId), updatedData);

// --- Gemini Story ---
export const generateStory = (data) => axios.post(API.GENERATE_STORY, data);

// --- Notifications ---
export const getNotifications = (userId) =>
  axios.get(`${BASE_URL}/api/notifications/${userId}`);

export const markNotificationAsRead = (id) =>
  axios.patch(`${BASE_URL}/api/notifications/read/${id}`);

export const deleteNotification = (id) =>
  axios.delete(`${BASE_URL}/api/notifications/delete/${id}`);
