import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getNotifications } from "/api.js";

const NotificationIcon = ({ userId }) => {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return; // ✅ Prevent request if no userId
      try {
        const res = await getNotifications(userId);
        const unread = res.data.some((n) => !n.read);
        setHasUnread(unread);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [userId]);

  return (
    <div className="relative">
      <Bell className="w-5 h-5" />
      {hasUnread && (
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400" />
      )}
    </div>
  );
};

export default NotificationIcon;
