// src/components/LineGraph.jsx
// src/components/LineGraph.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", waste: 20 },
  { month: "Feb", waste: 35 },
  { month: "Mar", waste: 30 },
  { month: "Apr", waste: 45 },
  { month: "May", waste: 40 },
  { month: "Jun", waste: 50 },
];

const LineGraph = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Monthly Waste Trend</h2>
      <LineChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis unit="kg" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="waste" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default LineGraph;
