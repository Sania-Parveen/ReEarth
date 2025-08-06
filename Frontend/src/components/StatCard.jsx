// src/components/StatsCard.jsx
// src/components/StatsCard.jsx
// src/components/StatsCard.jsx
import { Eye, Trash2, Leaf, Droplet } from "lucide-react";

const iconMap = {
  total: <Trash2 className="text-white w-6 h-6" />,
  black: <Droplet className="text-white w-6 h-6" />,
  green: <Leaf className="text-white w-6 h-6" />,
  blue: <Eye className="text-white w-6 h-6" />,
};

const StatCard = ({ type = "total", title, value, growth }) => {
  const gradientClasses = {
    total: "bg-gradient-to-br from-rose-300 to-fuchsia-600",
    black: "bg-gradient-to-br from-gray-700 to-gray-900",
    green: "bg-gradient-to-br from-emerald-500 to-green-600",
    blue: "bg-gradient-to-br from-blue-500 to-cyan-600",
  };

  return (
    <div className={`rounded-2xl shadow p-5 w-full ${gradientClasses[type]}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-md text-gray-200">{title}</h2>
        <div className="p-2 rounded-full bg-black bg-opacity-40 flex items-center justify-center shadow-inner">
          {iconMap[type]}
        </div>
      </div>
      <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
      <p className="text-sm mt-1 text-white text-opacity-75">
        {growth} vs last month
      </p>
    </div>
  );
};

export default StatCard;
