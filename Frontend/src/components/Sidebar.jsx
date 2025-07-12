import { useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Info,
  FolderPlus,
  LogIn,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 shadow-md transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}`
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-xl font-bold text-green-700">ReEarth</h1>}
        <Menu className="cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Scrollable Navigation Section */}
      <div className="flex-1 overflow-y-auto scroll-smooth px-2 space-y-2">
        {[
          { icon: User, label: 'Profile' },
          { icon: Home, label: 'Home' },
          { icon: BookOpen, label: 'Blog' },
          { icon: Info, label: 'About' },
          { icon: FolderPlus, label: 'Projects' },
          { icon: LogIn, label: 'Join' },
          // ➕ You can add more links here freely — it will become scrollable
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-200 cursor-pointer">
            <Icon className="text-green-700" />
            {!collapsed && <span className="text-gray-700">{label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
