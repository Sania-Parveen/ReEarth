# 🌍 ReEarth — Backend

ReEarth is a community platform that connects volunteers to local environmental cleanup events, tracks the waste they collect, and turns that data into shareable impact reports — built by a small team as an environment-focused side project.

This repo contains the **backend REST API**: authentication, event management, waste-tracking analytics, an AI report generator, a community blog, and automated volunteer notifications.

## ✨ Features

- **Authentication** — JWT-based signup/login with bcrypt password hashing
- **Events** — create, edit, delete, and browse cleanup events; volunteers can join events; event locations are automatically geocoded (address → lat/lng) via the OpenStreetMap Nominatim API
- **Waste tracking** — log waste collected per volunteer/event across green, blue, and black waste categories, with a dashboard endpoint that aggregates totals and daily trends
- **AI-generated event reports** — uses Google's Gemini API to turn an event's turnout and waste data into a written impact summary
- **Community blog** — create/read/delete blog posts with image uploads handled through Cloudinary
- **Automated notifications** — a daily `node-cron` job reminds volunteers on the day of events they've joined

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcryptjs |
| File storage | Cloudinary + Multer |
| AI | Google Gemini API (`@google/generative-ai`) |
| Geocoding | OpenStreetMap Nominatim API |
| Scheduling | node-cron |

## 📁 Project Structure

```
Backend/
├── controllers/    # Request handlers / business logic
├── models/         # Mongoose schemas (User, Event, Blog, WasteLog, Notification)
├── routes/         # Express route definitions
├── middleware/      # Multer upload middleware
├── db/             # MongoDB connection
├── utils/          # Cloudinary config
└── index.js        # App entry point
```

## 📡 API Overview

| Route | Description |
|---|---|
| `POST /api/auth/signup`, `/login` | User registration and login |
| `GET/POST/PUT/DELETE /api/events` | Event CRUD, join event, past events, AI-generated event report |
| `POST /api/waste/log` | Log waste collected at an event |
| `GET /api/waste/dashboard/summary/:userId` | Aggregated waste analytics for a user |
| `GET/POST/DELETE /api/blogs` | Community blog CRUD with image upload |
| `POST /api/gemini/ask` | General-purpose Gemini AI prompt endpoint |
| `GET/PATCH/DELETE /api/notifications` | Fetch, read, and delete notifications |

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd Backend
npm install
```

Create a `.env` file in the root (see `.env.example` for the required keys), then run:

```bash
npm run dev   # development, with nodemon
npm start     # production
```

## 🔑 Environment Variables

See [`.env.example`](./.env.example). You'll need a MongoDB URI, a JWT secret, Cloudinary credentials, and a Gemini API key.

## 👥 Team

Built collaboratively as an environment-action project. *(Add your team's names here!)*

## 📄 License

ISC
