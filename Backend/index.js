import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import cron from 'node-cron';
import { sendEventDayNotifications } from './controllers/notificationController.js';

import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from "./routes/blogRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import notificationRoutes from './routes/notificationRoutes.js';
import wasteRoutes from './routes/wasteRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gemini", geminiRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/waste', wasteRoutes);


// 🕗 Run at 8 AM every day to notify volunteers
cron.schedule('1 0 * * *', () => {
  console.log('⏰ Running daily notification job...');
  sendEventDayNotifications();
});

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

