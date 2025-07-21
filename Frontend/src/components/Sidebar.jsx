<<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Bell, Plus, LogOut, Map, User, Home } from "lucide-react";
// import { API } from "../api";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(localStorage.getItem("userId"));
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         if (!userId) return;
//         const res = await fetch(`${API.GET_NOTIFICATIONS}/${userId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setNotifications(data.notifications || []);
//         } else {
//           console.error("Failed to load notifications");
//         }
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, [userId]);

//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     setUserId(null);
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-64 bg-green-100 shadow-xl flex flex-col justify-between p-4">
//       <div>
//         <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
//           🌱 ReEarth
//         </h2>

//         <nav className="flex flex-col space-y-4">
//           <Link
//             to="/"
//             className="flex items-center space-x-2 text-green-800 hover:text-green-600"
//           >
//             <Home size={18} />
//             <span>Home</span>
//           </Link>

//           <Link
//             to="/events"
//             className="flex items-center space-x-2 text-green-800 hover:text-green-600"
//           >
//             <Map size={18} />
//             <span>Events</span>
//           </Link>

//           <Link
//             to="/create"
//             className="flex items-center space-x-2 text-green-800 hover:text-green-600"
//           >
//             <Plus size={18} />
//             <span>Create Event</span>
//           </Link>

//           <button
//             onClick={() => setShowNotifications(!showNotifications)}
//             className="flex items-center space-x-2 text-green-800 hover:text-green-600"
//           >
//             <Bell size={18} />
//             <span>Notifications</span>
//           </button>

//           {showNotifications && (
//             <div className="bg-white border rounded p-2 mt-2 max-h-40 overflow-y-auto text-sm shadow">
//               {notifications.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No notifications.</p>
//               ) : (
//                 notifications.map((note, index) => (
//                   <p key={index} className="text-gray-700 mb-1">
//                     🔔 {note}
//                   </p>
//                 ))
//               )}
//             </div>
//           )}

//           <Link
//             to="/profile"
//             className="flex items-center space-x-2 text-green-800 hover:text-green-600"
//           >
//             <User size={18} />
//             <span>Profile</span>
//           </Link>
//         </nav>
//       </div>

//       {userId && (
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 text-red-600 hover:text-red-800 mt-6"
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
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
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
  Info,
  BookOpen,
  Calendar,
  Users,
  FolderPlus,
  MessageSquare,
<<<<<<< HEAD
=======
  User,
  LogOut,
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
  Menu,
} from "lucide-react";
import { API } from "../api";

const Sidebar = ({ onSignOut }) => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!userId) return;
        const res = await fetch(`${API.GET_NOTIFICATIONS}/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications || []);
        } else {
          console.error("Failed to load notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

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
=======
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const links = [
    { icon: HomeIcon, label: 'Home', to: '/' },
    { icon: Info, label: 'About', to: '/About' },
    { icon: BookOpen, label: 'Blog', to: '/Blog' },
    { icon: Calendar, label: 'Events', to: '/events' },
    { icon: Users, label: 'Partners', to: '/partners' },
    { icon: FolderPlus, label: 'Projects', to: '/project' },
    { icon: MessageSquare, label: 'Chat', to: '/chat' },
    { icon: User, label: 'Profile', to: '/profile' },
  ];

  const handleSignOut = () => {
    // This sets isSignedUp to false (App.jsx)
    onSignOut();
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-gray-100 shadow-md transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top section */}
      <div>
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h1 className="text-xl font-bold text-green-700">ReEarth</h1>
          )}
          <Menu className="cursor-pointer text-gray-700 hover:text-green-700 transition-colors duration-200" onClick={toggleSidebar} />
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth px-2 space-y-2">
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
          {links.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
<<<<<<< HEAD
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

          {/* Notifications Popup */}
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
          )}
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
=======
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-200 hover:text-green-800 text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <Icon className="text-green-700" />
              {!collapsed && <span className="font-medium">{label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Sign Out */}
      <div className="px-2 py-4 border-t border-gray-300">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-100 text-red-600 font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-200"
        >
          <LogOut className="text-red-600" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
    </div>
  );
};

export default Sidebar;
