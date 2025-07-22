// src/components/StatsCard.jsx
// src/components/StatCard.jsx

import { TrendingUp, CheckCircle, Clock } from "lucide-react";

const StatCard = ({ title, value }) => {
  // Choose icon based on the title
  const getIcon = () => {
    if (title.toLowerCase().includes("total")) return <TrendingUp className="text-blue-500 w-6 h-6" />;
    if (title.toLowerCase().includes("recycled")) return <CheckCircle className="text-green-500 w-6 h-6" />;
    if (title.toLowerCase().includes("pending")) return <Clock className="text-yellow-500 w-6 h-6" />;
    return <TrendingUp className="text-gray-500 w-6 h-6" />;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">{getIcon()}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;


