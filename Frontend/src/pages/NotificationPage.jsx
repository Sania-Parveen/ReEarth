import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "/api.js";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Bell, CheckCircle } from "lucide-react"; // Added CheckCircle icon // Import delete function
import bg from "../assets/image1.png";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // ✅ Prevent broken request

      try {
        const res = await getNotifications(userId);
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 flex justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Notifications
        </h2>

        {notifications.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-600 text-lg">
            No notifications to display.
          </div>
        ) : (
          <ul className="space-y-6 w-full">
            {notifications.map((n) => (
              <li
                key={n._id}
                className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out flex items-center justify-between gap-4
                ${
                  n.read
                    ? "bg-green-50"
                    : "bg-green-100 border-2 border-green-300"
                }
                hover:shadow-xl transform hover:-translate-y-1`}
              >
                {/* Mark as Read Button */}
                {!n.read ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(n._id);
                    }}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-all duration-200 flex-shrink-0"
                    aria-label="Mark as read"
                  >
                    <CheckCircle size={20} />
                  </button>
                ) : (
                  <div className="p-2 rounded-full bg-gray-200 text-gray-500 flex-shrink-0">
                    <CheckCircle size={20} />
                  </div>
                )}

                {/* Message + Time */}
                <div className="flex-grow">
                  <p className="font-semibold text-lg text-gray-800 mb-1 leading-snug">
                    {n.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(n.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                {/* Notification Bell */}
                <div className="absolute top-2 right-16 text-green-600 opacity-75">
                  <Bell size={24} strokeWidth={1.5} />
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(n._id);
                  }}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-200 flex-shrink-0"
                  aria-label="Delete notification"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
