import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "/api.js"; // Adjust path if needed

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = "64c2ff8f2c7f2e1f23d90a0e"; // Real MongoDB user ID
    getDashboardSummary(userId)
      .then((res) => {
        setSummary(res.data);
        console.log("Dashboard Summary:", res.data);
      })
      .catch((err) => {
        setError("Failed to load dashboard summary");
        console.error("Error fetching summary:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Summary</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!summary ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Total Waste Logged</h2>
            <p className="text-xl">{summary.totalWaste} kg</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Events Participated</h2>
            <p className="text-xl">{summary.eventsParticipated}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Green Points Earned</h2>
            <p className="text-xl">{summary.greenPoints}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
