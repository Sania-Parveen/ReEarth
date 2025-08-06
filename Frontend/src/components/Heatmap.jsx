import React from "react";
import {
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  isSameMonth,
} from "date-fns";

/**
 * A heatmap component to show daily activity over the past year.
 * @param {object} props The component props.
 * @param {Array<object>} props.data An array of objects with 'date' and 'count' properties.
 */
const Heatmap = ({ data }) => {
  // Utility: Map date string to count for quick lookup.
  const getDateCountMap = (data) => {
    const map = {};
    data.forEach((entry) => {
      map[entry.date] = entry.count;
    });
    return map;
  };

  // Color scale for the heatmap cells based on count.
  const getColor = (count) => {
    if (!count) return "bg-gray-200";
    if (count < 2) return "bg-green-100";
    if (count < 4) return "bg-green-300";
    if (count < 6) return "bg-green-500";
    return "bg-green-700";
  };

  const dateCountMap = getDateCountMap(data);
  const today = new Date();

  // Calculate the date for one year ago from today.
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() + 1);

  // Determine the full grid range to display the past year, aligning to weeks.
  const startDate = startOfWeek(oneYearAgo, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(today, { weekStartsOn: 0 }); // Saturday
  const allDaysInGridRange = eachDayOfInterval({ start: startDate, end: endDate });

  // Group the days into weeks for the grid layout.
  const weeks = [];
  let currentWeek = [];

  allDaysInGridRange.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate positions for month labels.
  const monthLabels = [];
  let currentMonth = startOfMonth(oneYearAgo);
  while (currentMonth <= today || isSameMonth(currentMonth, today)) {
    let found = false;
    let startColumn = 0;

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
      for (let j = 0; j < week.length; j++) {
        if (isSameMonth(week[j], currentMonth)) {
          startColumn = i;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      monthLabels.push({
        name: format(currentMonth, "MMM"),
        startColumn,
      });
    }

    currentMonth = addMonths(currentMonth, 1);
  }

  // Day labels for the y-axis.
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 bg-yellow-50 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Waste Activity</h2>

      <div className="flex flex-col items-start overflow-x-auto">
        {/* Month Labels */}
        <div className="flex ml-[30px] mb-2 min-w-full">
          {monthLabels.map((month, idx) => {
            const next = monthLabels[idx + 1];
            const spanWeeks = next
              ? next.startColumn - month.startColumn
              : weeks.length - month.startColumn;
            const width = spanWeeks * 20;

            return (
              <span
                key={month.name + idx}
                style={{ minWidth: `${width}px` }}
                className="text-sm font-medium text-gray-600 px-[2px]"
              >
                {month.name}
              </span>
            );
          })}
        </div>

        <div className="flex">
          {/* Day Labels */}
          <div className="flex flex-col mr-2 text-sm text-gray-600 font-medium">
            {dayLabels.map((label) => (
              <span key={label} className="h-4 flex items-center justify-end pr-1">
                {label}
              </span>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const count = dateCountMap[dateStr] || 0;
                    const isInRange = day >= oneYearAgo && day <= today;

                    return (
                      <div
                        key={dateStr}
                        className={`w-4 h-4 rounded ${
                          isInRange ? getColor(count) : "bg-transparent"
                        } cursor-pointer transition duration-150 hover:scale-110 border border-gray-100`}
                        title={isInRange ? `${dateStr}: ${count} waste entries` : ""}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4 text-center">
        Past Year Waste Activity
      </div>
    </div>
  );
};

export default Heatmap;
