import express from 'express';
import { getNotifications, markAsRead,sendEventDayNotifications,deleteNotificationById } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:userId', getNotifications);
router.patch('/read/:id', markAsRead);
router.delete('/delete/:id', deleteNotificationById);

router.get('/send/test', async (req, res) => {
  try {
    await sendEventDayNotifications();
    res.json({ message: 'Test notifications sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Test failed' });
  }
});

export default router;
