// src/components/PieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WasteDonutChart = ({ pieData }) => {
  // Fallback if no pieData or it's not an array
  const data = Array.isArray(pieData) && pieData.length > 0
    ? pieData.map((item) => ({
        name: item.name || "Unknown",
        value: Number(item.value) || 0,
        color: item.color || "#999999",
      }))
    : [
        { name: "Black Waste", value: 20, color: "#000000" },
        { name: "Green Waste", value: 30, color: "#22c55e" },
        { name: "Blue Waste", value: 50, color: "#3b82f6" },
      ];

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl p-4 shadow-md flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-center">Waste Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            layout="horizontal"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteDonutChart;
