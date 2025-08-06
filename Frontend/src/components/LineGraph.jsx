import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

/**
 * A custom tooltip component to display detailed waste data on hover.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-600">
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: <span className="font-medium">{entry.value} kg</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Renders a line graph with a toggle for weekly and monthly data.
 * @param {{ data: object }} props The component props.
 * @param {object} props.data The raw daily data, where keys are dates.
 */
const LineGraph = ({ data }) => {
  // State to manage the current view (weekly or monthly)
  const [view, setView] = useState("weekly");

  if (!data || Object.keys(data).length === 0) return null;

  // Function to process data based on the selected view
  const getChartData = () => {
    if (view === "weekly") {
      // Get the last 7 days of data for the weekly view
      const lastSevenDays = Object.keys(data).slice(-7).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

      return Object.entries(lastSevenDays).map(([date, values]) => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        Blue: values.blue,
        Green: values.green,
        Black: values.black,
      }));
    } else if (view === "monthly") {
      // Aggregate data by month for the monthly view
      const monthlyData = {};
      Object.entries(data).forEach(([date, values]) => {
        const month = new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!monthlyData[month]) {
          monthlyData[month] = { Blue: 0, Green: 0, Black: 0 };
        }
        monthlyData[month].Blue += values.blue;
        monthlyData[month].Green += values.green;
        monthlyData[month].Black += values.black;
      });
      return Object.entries(monthlyData).map(([month, values]) => ({
        month,
        ...values,
      }));
    }
  };

  const chartData = getChartData();
  const xAxisDataKey = view === "weekly" ? "date" : "month";
  const title = view === "weekly" ? "Weekly Waste Collection" : "Monthly Waste Collection";

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-gray-800">📈 {title}</h3>
        {/* Toggle buttons for switching between views */}
        <div className="flex space-x-2">
          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
              view === "weekly"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
              view === "monthly"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis dataKey={xAxisDataKey} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {/* The "natural" type creates smooth, curved lines */}
          <Line
            type="natural"
            dataKey="Blue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="natural"
            dataKey="Green"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="natural"
            dataKey="Black"
            stroke="#000000"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
