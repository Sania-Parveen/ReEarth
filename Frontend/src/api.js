
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

  // --- Event Endpoints ---
  CREATE_EVENT: `${BASE_URL}/api/events/create`,
  GET_EVENTS: `${BASE_URL}/api/events`,
  GET_EVENT_BY_ID: (eventId) => `${BASE_URL}/api/events/${eventId}`,
  JOIN_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}/join`,
  

  DELETE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,
  UPDATE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,

  // --- Event Reports ---
  GET_PAST_EVENTS: `${BASE_URL}/api/events/past`,
  GENERATE_EVENT_REPORT: (eventId) => `${BASE_URL}/api/events/report/${eventId}`,

  // --- Notifications ---
  GET_NOTIFICATIONS: (userId) => `${BASE_URL}/api/notifications/${userId}`,
  MARK_AS_READ: (notificationId) => `${BASE_URL}/api/notifications/read/${notificationId}`,
  DELETE_NOTIFICATION: (notificationId) => `${BASE_URL}/api/notifications/delete/${notificationId}`,

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

// --- Events ---
export const getEvents = () => axios.get(API.GET_EVENTS);
export const createEvent = (eventData) => axios.post(API.CREATE_EVENT, eventData);
export const getEventById = (eventId) => axios.get(API.GET_EVENT_BY_ID(eventId));
export const joinEvent = (eventId, userId) =>
  axios.post(API.JOIN_EVENT(eventId), { userId });
export const logWaste = (eventId, data) => axios.post(API.LOG_WASTE(eventId), data);
export const deleteEvent = (eventId) => axios.delete(API.DELETE_EVENT(eventId));
export const updateEvent = (eventId, updatedData) => axios.put(API.UPDATE_EVENT(eventId), updatedData);

// --- Reports ---
export const getPastEvents = () => axios.get(API.GET_PAST_EVENTS);
export const generateEventReport = (eventId) => axios.get(API.GENERATE_EVENT_REPORT(eventId));

// --- Gemini AI ---
export const generateStory = (data) => axios.post(API.GENERATE_STORY, data);

// --- Notifications ---
export const getNotifications = async (userId) => {
  const res = await axios.get(API.GET_NOTIFICATIONS(userId));
  return res;
};

export const markNotificationAsRead = async (notificationId) => {
  const res = await axios.patch(API.MARK_AS_READ(notificationId));
  return res;
};

export const deleteNotification = async (notificationId) => {
  const res = await axios.delete(API.DELETE_NOTIFICATION(notificationId));
  return res;
};
