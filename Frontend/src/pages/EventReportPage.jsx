// // src/pages/EventReportPage.jsx
// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { FileText, Loader2, AlertTriangle } from "lucide-react";
// import { getPastEvents, generateEventReport } from "../api";



// const EventReportPage = () => {
//   const [pastEvents, setPastEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState("");
//   const [eventReport, setEventReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch past events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await getPastEvents();
//         setPastEvents(response.data);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events.");
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Generate event report
//   const handleGenerateReport = async () => {
//     if (!selectedEventId) {
//       setError("Please select an event.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setEventReport("");

//       const response = await generateEventReport(selectedEventId);

//       setEventReport(response.data.report); // Only 'report' field is returned
//     } catch (err) {
//       console.error("Error generating report:", err);
//       setError("Failed to generate report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//         <FileText className="w-6 h-6" />
//         Event Report Generator
//       </h1>

//       {/* Select Event */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Select Event:
//         </label>
//         <select
//           value={selectedEventId}
//           onChange={(e) => setSelectedEventId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         >
//           <option value="">-- Select an event --</option>
//           {pastEvents.map((event) => (
//             <option key={event._id} value={event.eventId}>
//               {event.title} - {new Date(event.date).toLocaleDateString()}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Generate Report Button */}
//       <button
//         onClick={handleGenerateReport}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? (
//           <span className="flex items-center gap-2">
//             <Loader2 className="animate-spin w-4 h-4" />
//             Generating...
//           </span>
//         ) : (
//           "Generate Report"
//         )}
//       </button>

//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 flex items-center text-red-600 bg-red-100 p-2 rounded">
//           <AlertTriangle className="w-4 h-4 mr-2" />
//           {error}
//         </div>
//       )}

//       {/* Report Output */}
//       {eventReport && (
//         <div className="mt-6 bg-white shadow p-4 rounded border border-gray-200 prose max-w-none">
//           <h2 className="text-xl font-semibold mb-2">Generated Report</h2>
//           <ReactMarkdown>{eventReport}</ReactMarkdown>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventReportPage;
// // import React, { useEffect, useState } from "react";
// // import { getAllEvents, generateEventReport } from "../api"; // ✅ Ensure these APIs are defined
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // const EventReportPage = () => {
// //   const [pastEvents, setPastEvents] = useState([]);
// //   const [selectedEventId, setSelectedEventId] = useState("");
// //   const [eventReport, setEventReport] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [selectedEventData, setSelectedEventData] = useState(null);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const response = await getAllEvents();
// //         setPastEvents(response.data?.events || []);
// //       } catch (err) {
// //         console.error("Error fetching events:", err);
// //         setError("Failed to fetch events.");
// //       }
// //     };
// //     fetchEvents();
// //   }, []);

// //   const handleGenerateReport = async () => {
// //     if (!selectedEventId) {
// //       setError("Please select an event.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");
// //       setEventReport("");
// //       setSelectedEventData(null);

// //       const response = await generateEventReport(selectedEventId);
// //       const report = response.data?.report;

// //       const selectedEvent = pastEvents.find(
// //         (event) => event.eventId === selectedEventId
// //       );

// //       const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
// //       const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
// //       const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

// //       setEventReport(report);
// //       setSelectedEventData({
// //         title: selectedEvent?.title || "Selected Event",
// //         volunteersJoined,
// //         volunteersRequired,
// //         wasteCollected,
// //       });
// //     } catch (err) {
// //       console.error("Error generating report:", err);
// //       setError("Failed to generate report.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-4 text-center">Event Report Generator</h1>

// //       <div className="mb-6">
// //         <label className="block mb-2 font-semibold">Select Event:</label>
// //         <select
// //           className="w-full border p-2 rounded"
// //           value={selectedEventId}
// //           onChange={(e) => setSelectedEventId(e.target.value)}
// //         >
// //           <option value="">-- Choose an Event --</option>
// //           {pastEvents.map((event) => (
// //             <option key={event.eventId} value={event.eventId}>
// //               {event.title}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <button
// //         onClick={handleGenerateReport}
// //         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //         disabled={loading}
// //       >
// //         {loading ? "Generating..." : "Generate Report"}
// //       </button>

// //       {error && <p className="text-red-600 mt-4">{error}</p>}

// //       {eventReport && (
// //         <div className="mt-8 p-4 border rounded bg-gray-100">
// //           <h2 className="text-2xl font-semibold mb-2">Generated Report</h2>
// //           <p className="whitespace-pre-line">{eventReport}</p>
// //         </div>
// //       )}

// //       {selectedEventData && (
// //         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {/* Chart 1: Volunteers */}
// //           <div className="bg-white shadow-md rounded p-4">
// //             <h3 className="text-lg font-bold mb-2">Volunteers: Required vs Joined</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={[selectedEventData]}>
// //                 <XAxis dataKey="title" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="volunteersJoined" fill="#34D399" name="Volunteers Joined" />
// //                 <Bar dataKey="volunteersRequired" fill="#F87171" name="Volunteers Required" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Chart 2: Waste Collected */}
// //           <div className="bg-white shadow-md rounded p-4">
// //             <h3 className="text-lg font-bold mb-2">Waste Collected (in Kg)</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={[selectedEventData]}>
// //                 <XAxis dataKey="title" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventReportPage;
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Loader2, AlertTriangle } from "lucide-react";
import { getEvents, generateEventReport } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EventReportPage = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventReport, setEventReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEventData, setSelectedEventData] = useState(null);

  // Fetch all events to populate the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Using 'getEvents' to fetch all events, similar to the commented-out code logic.
        const response = await getEvents();
        // Filter for past events to show in the dropdown.
        const now = new Date();
        const past = response.data.filter(event => new Date(event.date) <= now);
        setPastEvents(past);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      }
    };

    fetchEvents();
  }, []);

  // Generate event report and prepare chart data
  const handleGenerateReport = async () => {
    if (!selectedEventId) {
      setError("Please select an event.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEventReport("");
      setSelectedEventData(null);

      // Call the API to generate the text report
      const response = await generateEventReport(selectedEventId);
      const report = response.data.report;

      // Find the selected event from the list to get its data for the charts
      const selectedEvent = pastEvents.find(
        (event) => event.eventId === selectedEventId
      );

      // Extract the necessary data for the charts
      const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
      const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
      const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

      setEventReport(report);
      // Set the data for the charts
      setSelectedEventData({
        title: selectedEvent?.title || "Selected Event",
        volunteersJoined,
        volunteersRequired,
        wasteCollected,
      });
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        Event Report Generator
      </h1>

      {/* Select Event */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Select Event:
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select an event --</option>
          {pastEvents.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Generating...
          </span>
        ) : (
          "Generate Report"
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center text-red-600 bg-red-100 p-2 rounded">
          <AlertTriangle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {/* Report Output and Charts */}
      {eventReport && (
        <>
          <div className="mt-6 bg-white shadow p-4 rounded border border-gray-200 prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">Generated Report</h2>
            <ReactMarkdown>{eventReport}</ReactMarkdown>
          </div>
          {/* Charts section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Volunteers */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2 text-center">Volunteers: Required vs Joined</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[selectedEventData]}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volunteersJoined" fill="#34D399" name="Volunteers Joined" />
                  <Bar dataKey="volunteersRequired" fill="#F87171" name="Volunteers Required" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Waste Collected */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2 text-center">Waste Collected (in Kg)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[selectedEventData]}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventReportPage;
