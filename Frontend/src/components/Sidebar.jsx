// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home as HomeIcon,
//   Info,
//   BookOpen,
//   Calendar,
//   Users,
//   MessageSquare,
//   User,
//   LogOut,
//   Menu,
//   BrainCircuit,
// } from "lucide-react";
// import NotificationIcon from "./NotificationIcon"; // ✅ Your bell with dot component

// const Sidebar = ({ onSignOut }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const isActive = (path) => location.pathname === path;

//   const menuItems = [
//     { path: "/profile", label: "Profile", icon: <User size={20} /> },
//     { path: "/", label: "Home", icon: <HomeIcon size={20} /> },
//     { path: "/events", label: "Events", icon: <Calendar size={20} /> },
//     {
//       path: "/predict",
//       label: "Waste Predictor",
//       icon: <BrainCircuit size={20} />,
//     },
//     { path: "/blog", label: "Blog", icon: <BookOpen size={20} /> },
//     { path: "/chat", label: "Chat", icon: <MessageSquare size={20} /> },
//     {
//       path: "/partners",
//       label: "Recycling Partners",
//       icon: <Users size={20} />,
//     },
//     { path: "/about", label: "About", icon: <Info size={20} /> },
//   ];

//   return (
//     <div
//       className={`h-screen transition-all duration-300 flex flex-col ${
//         collapsed ? "w-16 bg-green-800/80" : "w-64 bg-green-800/80"
//       } text-white`}
//     >
//       <button onClick={toggleSidebar} className="p-4 focus:outline-none">
//         <Menu />
//       </button>

//       <ul className="space-y-3 px-2">
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition ${
//                 isActive(item.path) ? "bg-white text-green-800 font-bold" : ""
//               }`}
//             >
//               {item.icon}
//               {!collapsed && <span>{item.label}</span>}
//             </Link>
//           </li>
//         ))}
//         {/* ✅ Notification menu item */}
//         <li>
//           <Link
//             to="/notifications"
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition ${
//               isActive("/notifications")
//                 ? "bg-white text-green-800 font-bold"
//                 : ""
//             }`}
//           >
//             <NotificationIcon />
//             {!collapsed && <span>Notifications</span>}
//           </Link>
//         </li>

//         <li>
//           <button
//             onClick={onSignOut}
//             className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-white transition"
//           >
//             <LogOut size={20} />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Info,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  User,
  LogOut,
  Menu,
  BrainCircuit,
  FileText, // ✅ Importing icon for Report
} from "lucide-react";
import NotificationIcon from "./NotificationIcon"; // ✅ Your bell with dot component

const Sidebar = ({ onSignOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
    { path: "/", label: "Home", icon: <HomeIcon size={20} /> },
    { path: "/events", label: "Events", icon: <Calendar size={20} /> },
    {
      path: "/predict",
      label: "Waste Predictor",
      icon: <BrainCircuit size={20} />,
    },
    { path: "/blog", label: "Blog", icon: <BookOpen size={20} /> },
    { path: "/chat", label: "Chat", icon: <MessageSquare size={20} /> },
    {
      path: "/partners",
      label: "Recycling Partners",
      icon: <Users size={20} />,
    },
    { path: "/report", label: "Report", icon: <FileText size={20} /> }, // ✅ New Report menu item
    { path: "/about", label: "About", icon: <Info size={20} /> },
  ];

  return (
    <div
      className={`h-screen transition-all duration-300 flex flex-col ${
        collapsed ? "w-16 bg-green-800/80" : "w-64 bg-green-800/80"
      } text-white`}
    >
      <button onClick={toggleSidebar} className="p-4 focus:outline-none">
        <Menu />
      </button>

      <ul className="space-y-3 px-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition ${
                isActive(item.path) ? "bg-white text-green-800 font-bold" : ""
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}

        {/* ✅ Notification menu item */}
        <li>
          <Link
            to="/notifications"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition ${
              isActive("/notifications")
                ? "bg-white text-green-800 font-bold"
                : ""
            }`}
          >
            <NotificationIcon />
            {!collapsed && <span>Notifications</span>}
          </Link>
        </li>

        <li>
          <button
            onClick={onSignOut}
            className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-white transition"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
