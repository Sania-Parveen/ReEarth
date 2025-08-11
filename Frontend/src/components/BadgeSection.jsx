// src/components/BadgeSection.jsx
import { FaAward } from "react-icons/fa"; // Example icon, install react-icons if not already

const BadgeSection = ({ heatmapData }) => {
  const totalLogs = heatmapData.reduce((sum, item) => sum + item.count, 0);

  const getBadge = () => {
    if (totalLogs > 50)
      return { label: "Eco Champion 🌟", color: "bg-green-600" };
    if (totalLogs > 20)
      return { label: "Waste Warrior 💎", color: "bg-green-500" };
    if (totalLogs > 5)
      return { label: "Eco Starter 🌱", color: "bg-green-300" };
    return { label: "Just Getting Started 🐣", color: "bg-yellow-300" };
  };

  const badge = getBadge();

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Your Badge
        </h2>

        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-lg font-semibold shadow-md ${badge.color}`}
        >
          <FaAward className="text-xl" />
          {badge.label}
        </div>

        <p className="mt-4 text-gray-500 text-lg">
          You've logged waste <span className="font-bold">{totalLogs}</span>{" "}
          times so far.
        </p>
      </div>
    </div>
  );
};

export default BadgeSection;
