import express from 'express';
import { getNotifications, markAsRead,deleteNotificationById } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:userId', getNotifications);
router.patch('/read/:id', markAsRead);
router.delete('/delete/:id', deleteNotificationById);

export default router;
