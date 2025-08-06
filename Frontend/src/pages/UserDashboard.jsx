import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import WasteDonutChart from "../components/PieChart";
import LineGraph from "../components/LineGraph";
import WasteProgress from "../components/WasteProgress";
import Heatmap from "../components/Heatmap";
import WasteModal from "../components/WasteModal";
import { logWaste, getDashboardSummary } from "/api.js";

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";


  // 📌 Fetch dashboard summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getDashboardSummary(userId);

        const pieChart = [
          {
            name: "Black Waste",
            value: res.data.totalBlackKg,
            color: "#000000",
          },
          {
            name: "Green Waste",
            value: res.data.totalGreenKg,
            color: "#22c55e",
          },
          {
            name: "Blue Waste",
            value: res.data.totalBlueKg,
            color: "#3b82f6",
          },
        ];

        const transformedHeatmap = Object.entries(res.data.dailyData || {}).map(
          ([date, wasteObj]) => ({
            date,
            count: (wasteObj.blue || 0) + (wasteObj.green || 0) + (wasteObj.black || 0),
          })
        );

        setSummary({ ...res.data, pieChart });
        setHeatmapData(transformedHeatmap);
      } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
      }
    };

    if (userId) fetchSummary();
  }, [userId]);

  // 📌 Log waste callback
  const handleWasteAdded = async (wasteData) => {
    try {
      const payload = { ...wasteData, userId };
      await logWaste(payload);
      setIsModalOpen(false);

      const res = await getDashboardSummary(userId);

      const pieChart = [
        {
          name: "Black Waste",
          value: res.data.totalBlackKg,
          color: "#000000",
        },
        {
          name: "Green Waste",
          value: res.data.totalGreenKg,
          color: "#22c55e",
        },
        {
          name: "Blue Waste",
          value: res.data.totalBlueKg,
          color: "#3b82f6",
        },
      ];

      const transformedHeatmap = Object.entries(res.data.dailyData || {}).map(
        ([date, wasteObj]) => ({
          date,
          count: (wasteObj.blue || 0) + (wasteObj.green || 0) + (wasteObj.black || 0),
        })
      );

      setSummary({ ...res.data, pieChart });
      setHeatmapData(transformedHeatmap);
    } catch (err) {
      console.error("Error logging waste:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
          Welcome, <span className="text-green-700">{userName}</span>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            Verified User
          </span>
        </h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add Waste
        </button>
      </div>

      {/* Waste Modal */}
      <WasteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onAddWaste={handleWasteAdded}
      />

      {/* Stats Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            type="total"
            title="Total Waste"
            value={`${summary.totalBlueKg + summary.totalGreenKg + summary.totalBlackKg} kg`}
            growth="+8.2%"
          />
          <StatCard
            type="black"
            title="Black Waste"
            value={`${summary.totalBlackKg} kg`}
            growth="-2.1%"
          />
          <StatCard
            type="green"
            title="Green Waste"
            value={`${summary.totalGreenKg} kg`}
            growth="+5.6%"
          />
          <StatCard
            type="blue"
            title="Blue Waste"
            value={`${summary.totalBlueKg} kg`}
            growth="+3.3%"
          />
        </div>
      )}

      {/* Charts */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WasteDonutChart pieData={summary.pieChart} />
          <LineGraph data={summary.dailyData} />
        </div>
      )}

      {/* Heatmap */}
      <div className="bg-white p-4 rounded-xl shadow">
       
        <Heatmap data={heatmapData} />
      </div>

      {/* Progress */}
      <WasteProgress />
    </div>
  );
};

export default UserDashboard;
