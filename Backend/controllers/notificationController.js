import Notification from '../models/Notification.js';
import Event from '../models/Event.js';
import { nanoid } from 'nanoid';

// Get all notifications for a user
export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
export const deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notif = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

// Send notifications to volunteers on the day of event
export const sendEventDayNotifications = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const eventsToday = await Event.find({ date: today });

    for (const event of eventsToday) {
      for (const volunteerId of event.volunteersJoined) {
        await Notification.create({
          notificationId: nanoid(),
          userId: volunteerId,
          message: `Reminder: Event "${event.title}" is happening today!`,
        });
      }
    }

    console.log(`[Notification Job] Sent notifications for ${eventsToday.length} event(s).`);
  } catch (err) {
    console.error('Error sending event notifications:', err);
  }
};
