// src/components/NotificationList.jsx
import React from "react";

const NotificationList = ({ notifications, onMarkRead, onDelete }) => {
  if (!notifications || notifications.length === 0) {
    return <p className="text-sm text-gray-500">No notifications</p>;
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notif) => (
        <div
          key={notif._id}
          className={`p-2 border-b flex justify-between items-start ${
            !notif.read ? "bg-green-50 font-semibold" : ""
          }`}
        >
          <div
            className="cursor-pointer text-sm"
            onClick={() => onMarkRead(notif._id)}
          >
            {notif.message}
            <div className="text-xs text-gray-400">
              {new Date(notif.createdAt).toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => onDelete(notif._id)}
            className="text-red-400 text-xs"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
