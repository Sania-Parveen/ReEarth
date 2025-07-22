// src/components/Heatmap.jsx
// src/components/Heatmap.jsx
// src/components/Heatmap.jsx
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Heatmap = ({ data }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Event Participation</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          if (value.count < 3) {
            return "color-scale-1";
          }
          if (value.count < 5) {
            return "color-scale-2";
          }
          return "color-scale-3";
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": `${value.date}: ${value.count || 0} events`,
        })}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default Heatmap;
