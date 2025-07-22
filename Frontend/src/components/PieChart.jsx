// src/components/PieChart.jsx
// src/components/PieChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Plastic", value: 45 },
  { name: "Organic", value: 25 },
  { name: "Metal", value: 15 },
  { name: "E-Waste", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

const CustomPieChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Waste Composition</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
