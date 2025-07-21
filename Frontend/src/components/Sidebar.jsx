// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Plus,
//   LogOut,
//   Map,
//   User,
//   Home,
//   Info,
//   BookOpen,
//   Calendar,
//   Users,
//   FolderPlus,
//   MessageSquare,
//   Menu,
// } from "lucide-react";
// import { API } from "../api";

// const Sidebar = ({ onSignOut }) => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [userId, setUserId] = useState(localStorage.getItem("userId"));
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const toggleSidebar = () => setCollapsed(!collapsed);

//   // useEffect(() => {
//   //   const fetchNotifications = async () => {
//   //     try {
//   //       if (!userId) return;
//   //       const res = await fetch(${API.GET_NOTIFICATIONS}/${userId});
//   //       const data = await res.json();
//   //       if (res.ok) {
//   //         setNotifications(data.notifications || []);
//   //       } else {
//   //         console.error("Failed to load notifications");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching notifications:", error);
//   //     }
//   //   };

//   //   fetchNotifications();
//   // }, [userId]);

//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     setUserId(null);
//     if (onSignOut) onSignOut();
//     navigate("/login");
//   };

//   const links = [
//     { icon: Home, label: "Home", to: "/" },
//     { icon: Info, label: "About", to: "/About" },
//     { icon: BookOpen, label: "Blog", to: "/Blog" },
//     { icon: Calendar, label: "Events", to: "/events" },
//     { icon: Users, label: "Partners", to: "/partners" },
//     { icon: FolderPlus, label: "Projects", to: "/project" },
//     { icon: MessageSquare, label: "Chat", to: "/chat" },
//     { icon: Plus, label: "Create Event", to: "/create" },
//     { icon: User, label: "Profile", to: "/profile" },
//   ];

//   return (
//     <div
//       className={`h-screen bg-green-100 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       <div>
//         {/* Header */}
//         <div className="flex items-center justify-between p-4">
//           {!collapsed && (
//             <h2 className="text-2xl font-bold text-green-700">🌱 ReEarth</h2>
//           )}
//           <Menu
//             className="cursor-pointer text-gray-700 hover:text-green-700"
//             onClick={toggleSidebar}
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex flex-col space-y-2 px-4">
//           {links.map(({ icon: Icon, label, to }) => (
//             <Link
//               key={label}
//               to={to}
//               className="flex items-center gap-3 p-2 rounded hover:bg-green-200 text-green-800 transition-colors"
//             >
//               <Icon size={20} />
//               {!collapsed && <span>{label}</span>}
//             </Link>
//           ))}

//           {/* Notifications Button */}
//           <button
//             onClick={() => setShowNotifications(!showNotifications)}
//             className="flex items-center gap-3 p-2 rounded hover:bg-green-200 text-green-800 transition-colors"
//           >
//             <Bell size={20} />
//             {!collapsed && <span>Notifications</span>}
//           </button>

//           {/* Notifications Popup */}
//           {!collapsed && showNotifications && (
//             <div className="bg-white border rounded p-2 max-h-40 overflow-y-auto shadow text-sm mt-1">
//               {notifications.length === 0 ? (
//                 <p className="text-gray-500">No notifications.</p>
//               ) : (
//                 notifications.map((note, index) => (
//                   <p key={index} className="text-gray-700 mb-1">
//                     🔔 {note}
//                   </p>
//                 ))
//               )}
//             </div>
//           )}
//         </nav>
//       </div>

//       {/* Logout */}
//       {userId && (
//         <div className="p-4 border-t border-green-300">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 text-red-600 hover:text-red-800 transition-colors"
//           >
//             <LogOut size={20} />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Plus,
  LogOut,
  Map,
  User,
  Home,
  Info,
  BookOpen,
  Calendar,
  Users,
  FolderPlus,
  MessageSquare,
  Menu,
} from "lucide-react";
import { API } from "/api.js";

const Sidebar = ({ onSignOut }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  // const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       if (!userId) return;
  //       const res = await fetch(${API.GET_NOTIFICATIONS}/${userId});
  //       const data = await res.json();
  //       if (res.ok) {
  //         setNotifications(data.notifications || []);
  //       } else {
  //         console.error("Failed to load notifications");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();
  // }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    if (onSignOut) onSignOut();
    navigate("/login");
  };

  const links = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Info, label: "About", to: "/About" },
    { icon: BookOpen, label: "Blog", to: "/Blog" },
    { icon: Calendar, label: "Events", to: "/events" },
    { icon: Users, label: "Partners", to: "/partners" },
    { icon: FolderPlus, label: "Projects", to: "/project" },
    { icon: MessageSquare, label: "Chat", to: "/chat" },
    { icon: Plus, label: "Create Event", to: "/create" },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  return (
    <div
      className={`h-screen bg-green-100 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h2 className="text-2xl font-bold text-green-700">🌱 ReEarth</h2>
          )}
          <Menu
            className="cursor-pointer text-gray-700 hover:text-green-700"
            onClick={toggleSidebar}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 px-4">
          {links.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 p-2 rounded hover:bg-green-200 text-green-800 transition-colors"
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}

          {/* Notifications Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center gap-3 p-2 rounded hover:bg-green-200 text-green-800 transition-colors"
          >
            <Bell size={20} />
            {!collapsed && <span>Notifications</span>}
          </button>

          {/* Notifications Popup
          {!collapsed && showNotifications && (
            <div className="bg-white border rounded p-2 max-h-40 overflow-y-auto shadow text-sm mt-1">
              {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications.</p>
              ) : (
                notifications.map((note, index) => (
                  <p key={index} className="text-gray-700 mb-1">
                    🔔 {note}
                  </p>
                ))
              )}
            </div>
          )} */}
        </nav>
      </div>

      {/* Logout */}
      {userId && (
        <div className="p-4 border-t border-green-300">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-800 transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
