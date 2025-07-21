// src/components/NotificationBell.jsx
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../api";
import NotificationList from "./NotificationList";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetchNotifs();
  }, [userId]);

  const fetchNotifs = async () => {
    try {
      const res = await getNotifications(userId);
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id) => {
    await markNotificationAsRead(id);
    fetchNotifs();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifs();
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative"
      >
        <Bell className="w-6 h-6 text-green-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-50 max-h-96 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Notifications
          </h3>
          <NotificationList
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
