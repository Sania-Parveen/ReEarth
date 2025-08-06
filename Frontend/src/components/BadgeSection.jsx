// src/components/BadgeSection.jsx

// src/components/BadgeSection.jsx

const BadgeSection = ({ heatmapData }) => {
  const totalLogs = heatmapData.reduce((sum, item) => sum + item.count, 0);

  const getBadge = () => {
    if (totalLogs > 50) return { label: "Eco Champion 🌟", color: "bg-green-700" };
    if (totalLogs > 20) return { label: "Waste Warrior 💪", color: "bg-green-500" };
    if (totalLogs > 5) return { label: "Eco Starter 🌱", color: "bg-green-300" };
    return { label: "Just Getting Started 🐣", color: "bg-yellow-300" };
  };

  const badge = getBadge();

  return (
    <div className="mt-4 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Your Badge</h2>
      <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${badge.color}`}>
        {badge.label}
      </div>
      <p className="mt-2 text-gray-600">You've logged waste {totalLogs} times so far.</p>
    </div>
  );
};

export default BadgeSection;
