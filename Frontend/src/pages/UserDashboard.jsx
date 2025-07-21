import { useState } from "react";
import StatCard from "../components/StatCard";
import PieChart from "../components/PieChart";
import LineGraph from "../components/LineGraph";
import WasteProgress from "../components/WasteProgress";
import Heatmap from "../components/Heatmap";
import WasteModal from "../components/WasteModal";

const dummyHeatmapData = [
  { date: "2025-06-20", count: 1 },
  { date: "2025-06-21", count: 3 },
  { date: "2025-06-22", count: 6 },
  { date: "2025-06-25", count: 2 },
];

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Waste
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Waste Logged" value="125 kg" />
        <StatCard title="Recycled Waste" value="85 kg" />
        <StatCard title="Pending Pickup" value="40 kg" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart />
        <LineGraph />
      </div>

      {/* Heatmap Section */}
      <Heatmap data={dummyHeatmapData} />

      {/* Progress Section */}
      <WasteProgress />

      {/* Waste Modal */}
      <WasteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserDashboard;
