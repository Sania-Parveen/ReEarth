// import { FaAward } from "react-icons/fa";

// const BadgeSection = ({ heatmapData }) => {
//   const totalLogs = heatmapData.reduce((sum, item) => sum + item.count, 0);

//   const getBadge = () => {
//     if (totalLogs > 50)
//       return { label: "Eco Champion 🌟", color: "from-green-500 to-green-700" };
//     if (totalLogs > 20)
//       return {
//         label: "Waste Warrior 💪",
//         color: "from-green-400 to-green-600",
//       };
//     if (totalLogs > 5)
//       return { label: "Eco Starter 🌱", color: "from-green-300 to-green-500" };
//     return {
//       label: "Just Getting Started 🐣",
//       color: "from-yellow-300 to-yellow-500",
//     };
//   };

//   const badge = getBadge();

//   return (
//     <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Badge</h2>

//       {/* BIGGER Badge Pill */}
//       <div
//         className={`inline-flex items-center gap-3 px-7 py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r ${badge.color} shadow-md`}
//         style={{ minWidth: "240px", justifyContent: "center" }}
//       >
//         <FaAward className="text-2xl" />
//         {badge.label}
//       </div>

//       <p className="mt-3 text-gray-600 text-lg">
//         You've logged waste <span className="font-bold">{totalLogs}</span> times
//         so far.
//       </p>
//     </div>
//   );
// };

// export default BadgeSection;
import React from "react";
import { FaAward } from "react-icons/fa";

// This component displays a user's achievement badge based on their waste logging activity.
// The UI has been enhanced for a cleaner, more modern look.
const BadgeSection = ({ heatmapData }) => {
  // Calculate the total number of waste logs from the heatmap data.
  const totalLogs = heatmapData.reduce((sum, item) => sum + item.count, 0);

  // Determine the badge details (label, emoji, color) based on the total logs.
  // The logic for this has not been changed, only the styling properties.
  const getBadge = () => {
    if (totalLogs > 50)
      return {
        label: "Eco Champion",
        emoji: "🌟",
        color: "bg-gradient-to-r from-green-600 to-emerald-500",
      };
    if (totalLogs > 20)
      return {
        label: "Waste Warrior",
        emoji: "💪",
        color: "bg-gradient-to-r from-green-500 to-green-400",
      };
    if (totalLogs > 5)
      return {
        label: "Eco Starter",
        emoji: "🌱",
        color: "bg-gradient-to-r from-lime-500 to-lime-300",
      };
    return {
      label: "Just Getting Started",
      emoji: "🐣",
      color: "bg-gradient-to-r from-yellow-500 to-amber-400",
    };
  };

  const badge = getBadge();

  return (
    // Main container with a clean, light background and soft rounded corners.
    <div className="mt-8 p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-gray-200 max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.01]">
      {/* Section title with improved font weight and color. */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-6">
        Your Badge
      </h2>

      {/* Badge container with dynamic background gradient and a hover effect for a sense of achievement. */}
      <div
        className={`inline-flex items-center justify-center w-full min-w-[200px] gap-3 px-6 py-3 rounded-full 
                    text-white text-lg md:text-xl font-bold tracking-wide 
                    ${badge.color} shadow-lg shadow-gray-400/50 
                    transform transition-all duration-300 ease-in-out cursor-pointer 
                    hover:shadow-xl hover:shadow-gray-500/50 hover:scale-105`}
      >
        <FaAward className="text-xl md:text-2xl" />
        {badge.label} {badge.emoji}
      </div>

      {/* Supporting text with a clean font and color, centered below the badge. */}
      <p className="mt-4 text-gray-600 text-center text-md md:text-lg">
        You've logged waste{" "}
        <span className="font-extrabold text-gray-900">{totalLogs}</span> times
        so far.
      </p>
    </div>
  );
};

// A parent component to showcase the BadgeSection.
const App = () => {
  // Example data to test the component's different badges.
  const sampleData = [{ count: 10 }, { count: 15 }, { count: 5 }];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-sans antialiased flex items-center justify-center">
      <BadgeSection heatmapData={sampleData} />
    </div>
  );
};

export default App;
