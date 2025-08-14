
import axios from "axios";

// ✅ Base URL from .env or fallback
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://reearth-backend.onrender.com";


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
  

   // --- Event Reports ---
  GET_PAST_EVENTS: `${BASE_URL}/api/events/past`,
  GENERATE_EVENT_REPORT: (eventId) => `${BASE_URL}/api/events/report/${eventId}`,

  DELETE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,
  UPDATE_EVENT: (eventId) => `${BASE_URL}/api/events/${eventId}`,

  // --- Dashboard / Waste Analytics ---
GET_TOTAL_WASTE: `${BASE_URL}/api/waste/total`,
GET_WASTE_BY_TYPE: `${BASE_URL}/api/waste/by-type`,
GET_WASTE_BY_EVENT: (eventId) => `${BASE_URL}/api/waste/event/${eventId}`,
GET_WASTE_BY_USER: (userId) => `${BASE_URL}/api/waste/user/${userId}`,
GET_WASTE_TRENDS: `${BASE_URL}/api/waste/trends`,
GET_JOINED_EVENTS: (userId) => `${BASE_URL}/api/events/joined/${userId}`,
//LOG_WASTE: (eventId) => `${BASE_URL}/api/events/${eventId}/waste`,
// Add this line under Dashboard / Waste Analytics

GET_DASHBOARD_SUMMARY: (userId) => `${BASE_URL}/api/waste/dashboard/summary/${userId}`,
LOG_WASTE: `${BASE_URL}/api/waste/log`, // ✅ static endpoint for logging waste







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
export const deleteBlog = (id) => axios.delete(API.DELETE_BLOG(id));

// --- Events ---
// ✅ Create Event
export const createEvent = async (eventData) => {
  try {
    const res = await axios.post(API.CREATE_EVENT, eventData);
    return res.data;
  } catch (err) {
    console.error("Error creating event:", err.response?.data || err.message);
    if (err.response && typeof err.response.data === 'string') {
      console.error("HTML/Error page returned:", err.response.data);
    }
    throw err;
  }
};

export const getEvents = () => axios.get(API.GET_EVENTS);
export const getEventById = (eventId) => axios.get(API.GET_EVENT_BY_ID(eventId));
export const joinEvent = (eventId, userId) =>
  axios.post(API.JOIN_EVENT(eventId), { userId });

export const deleteEvent = (eventId) =>
  axios.delete(API.DELETE_EVENT(eventId));
export const updateEvent = (eventId, updatedData) =>
  axios.put(API.UPDATE_EVENT(eventId), updatedData);


// --- Dashboard / Waste Analytics ---
export const getTotalWaste = () => axios.get(API.GET_TOTAL_WASTE);
export const getWasteByType = () => axios.get(API.GET_WASTE_BY_TYPE);
export const getWasteByEvent = (eventId) => axios.get(API.GET_WASTE_BY_EVENT(eventId));
export const getWasteByUser = (userId) => axios.get(API.GET_WASTE_BY_USER(userId));
export const getWasteTrends = () => axios.get(API.GET_WASTE_TRENDS);
export const getJoinedEvents = (userId) =>
  axios.get(API.GET_JOINED_EVENTS(userId));
//export const logWaste = (eventId, data) =>
//  axios.post(API.LOG_WASTE(eventId), data);
export const logWaste = (data) => axios.post(API.LOG_WASTE, data);
export const getDashboardSummary = (userId) =>
  axios.get(API.GET_DASHBOARD_SUMMARY(userId));






// --- Gemini Story ---
export const generateStory = (data) => axios.post(API.GENERATE_STORY, data);


// --- Reports ---
export const getPastEvents = () => axios.get(API.GET_PAST_EVENTS);
export const generateEventReport = (eventId) => axios.get(API.GENERATE_EVENT_REPORT(eventId));

export const getNotifications = (userId) =>
  axios.get(`${API.BASE_URL}/api/notifications/${userId}`);
export const markNotificationAsRead = (id) =>
  axios.patch(`${API.BASE_URL}/api/notifications/read/${id}`);
export const deleteNotification = (id) =>
  axios.delete(`${API.BASE_URL}/api/notifications/delete/${id}`);

