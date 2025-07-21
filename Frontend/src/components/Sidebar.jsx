import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Info,
  BookOpen,
  Calendar,
  Users,
  FolderPlus,
  MessageSquare,
  User,
  LogOut,
  Menu,
} from "lucide-react";

const Sidebar = ({ onSignOut }) => {
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
          {links.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
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
    </div>
  );
};

export default Sidebar;
