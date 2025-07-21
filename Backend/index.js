// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import connectDB from './db/db.js';
// import userRoutes from './routes/userRoutes.js'; // example route
// import authRoutes from './routes/authRoutes.js';
// import eventRoutes from './routes/eventRoutes.js';
// import blogRoutes from "./routes/blogRoutes.js";
// import geminiRoutes from "./routes/geminiRoutes.js";
// import notificationRoutes from './routes/notificationRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/gemini", geminiRoutes);
// app.use('/api/users', userRoutes); // example route path
// app.use('/api/notifications', notificationRoutes);

// // Connect to MongoDB and start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });
// import cron from 'node-cron';
// import { sendEventDayNotifications } from './controllers/notificationController.js';

// // Run at 8 AM every day
// cron.schedule('0 8 * * *', () => {
//   console.log('⏰ Running daily notification job...');
//   sendEventDayNotifications();
// });
// ==== Top of file ====
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import cron from 'node-cron';
import { sendEventDayNotifications } from './controllers/notificationController.js';

import connectDB from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from "./routes/blogRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
<<<<<<< HEAD

=======
>>>>>>> c82d57fc22525ff6a17970b029c6dfedd867be1b



>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gemini", geminiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/waste', wasteRoutes);


// 🕗 Run at 8 AM every day to notify volunteers
cron.schedule('0 8 * * *', () => {
  console.log('⏰ Running daily notification job...');
  sendEventDayNotifications();
});

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

