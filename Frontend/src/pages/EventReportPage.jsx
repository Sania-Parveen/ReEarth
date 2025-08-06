
// // import React, { useState, useEffect } from "react";
// // import ReactMarkdown from "react-markdown";
// // import { FileText, Loader2, AlertTriangle } from "lucide-react";
// // import { getEvents, generateEventReport } from "/api.js";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // const EventReportPage = () => {
// //   const [pastEvents, setPastEvents] = useState([]);
// //   const [selectedEventId, setSelectedEventId] = useState("");
// //   const [eventReport, setEventReport] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [selectedEventData, setSelectedEventData] = useState(null);

// //   // Fetch all events to populate the dropdown
// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         // Using 'getEvents' to fetch all events, similar to the commented-out code logic.
// //         const response = await getEvents();
// //         // Filter for past events to show in the dropdown.
// //         const now = new Date();
// //         const past = response.data.filter(event => new Date(event.date) <= now);
// //         setPastEvents(past);
// //         setError("");
// //       } catch (err) {
// //         console.error("Error fetching events:", err);
// //         setError("Failed to load events.");
// //       }
// //     };

// //     fetchEvents();
// //   }, []);

// //   // Generate event report and prepare chart data
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

// //       // Call the API to generate the text report
// //       const response = await generateEventReport(selectedEventId);
// //       const report = response.data.report;

// //       // Find the selected event from the list to get its data for the charts
// //       const selectedEvent = pastEvents.find(
// //         (event) => event.eventId === selectedEventId
// //       );

// //       // Extract the necessary data for the charts
// //       const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
// //       const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
// //       const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

// //       setEventReport(report);
// //       // Set the data for the charts
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
// //     <div className="max-w-4xl mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
// //         <FileText className="w-6 h-6" />
// //         Event Report Generator
// //       </h1>

// //       {/* Select Event */}
// //       <div className="mb-4">
// //         <label className="block mb-2 font-medium text-gray-700">
// //           Select Event:
// //         </label>
// //         <select
// //           value={selectedEventId}
// //           onChange={(e) => setSelectedEventId(e.target.value)}
// //           className="w-full p-2 border border-gray-300 rounded"
// //         >
// //           <option value="">-- Select an event --</option>
// //           {pastEvents.map((event) => (
// //             <option key={event.eventId} value={event.eventId}>
// //               {event.title} - {new Date(event.date).toLocaleDateString()}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Generate Report Button */}
// //       <button
// //         onClick={handleGenerateReport}
// //         disabled={loading}
// //         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
// //       >
// //         {loading ? (
// //           <span className="flex items-center gap-2">
// //             <Loader2 className="animate-spin w-4 h-4" />
// //             Generating...
// //           </span>
// //         ) : (
// //           "Generate Report"
// //         )}
// //       </button>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="mt-4 flex items-center text-red-600 bg-red-100 p-2 rounded">
// //           <AlertTriangle className="w-4 h-4 mr-2" />
// //           {error}
// //         </div>
// //       )}

// //       {/* Report Output and Charts */}
// //       {eventReport && (
// //         <>
// //           <div className="mt-6 bg-white shadow p-4 rounded border border-gray-200 prose max-w-none">
// //             <h2 className="text-xl font-semibold mb-2">Generated Report</h2>
// //             <ReactMarkdown>{eventReport}</ReactMarkdown>
// //           </div>
// //           {/* Charts section */}
// //           <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
// //             {/* Chart 1: Volunteers */}
// //             <div className="bg-white shadow-md rounded-lg p-4">
// //               <h3 className="text-lg font-bold mb-2 text-center">Volunteers: Required vs Joined</h3>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <BarChart data={[selectedEventData]}>
// //                   <XAxis dataKey="title" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Bar dataKey="volunteersJoined" fill="#34D399" name="Volunteers Joined" />
// //                   <Bar dataKey="volunteersRequired" fill="#F87171" name="Volunteers Required" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>

// //             {/* Chart 2: Waste Collected */}
// //             <div className="bg-white shadow-md rounded-lg p-4">
// //               <h3 className="text-lg font-bold mb-2 text-center">Waste Collected (in Kg)</h3>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <BarChart data={[selectedEventData]}>
// //                   <XAxis dataKey="title" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventReportPage;
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import blogBackground from '../assets/blogBackground.jpg'; // Import the background image
// import { FileText, Loader2, AlertTriangle, CheckCircle } from "lucide-react"; // Added CheckCircle for success
// import { getEvents, generateEventReport } from "/api.js"; // Assuming api.js is correctly linked
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const EventReportPage = () => {
//   const [pastEvents, setPastEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState("");
//   const [eventReport, setEventReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedEventData, setSelectedEventData] = useState(null);
//   const [reportGenerated, setReportGenerated] = useState(false); // New state for successful generation

//   // Fetch all events to populate the dropdown
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true); // Set loading true while fetching events
//         const response = await getEvents();
//         const now = new Date();
//         // Filter for past events to show in the dropdown.
//         const past = response.data.filter(event => new Date(event.date) <= now);
//         setPastEvents(past);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events. Please try again later.");
//       } finally {
//         setLoading(false); // Set loading false after fetching events
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Generate event report and prepare chart data
//   const handleGenerateReport = async () => {
//     if (!selectedEventId) {
//       setError("Please select an event to generate a report.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setEventReport("");
//       setSelectedEventData(null);
//       setReportGenerated(false); // Reset success state

//       // Call the API to generate the text report
//       const response = await generateEventReport(selectedEventId);
//       const report = response.data.report;

//       // Find the selected event from the list to get its data for the charts
//       const selectedEvent = pastEvents.find(
//         (event) => event.eventId === selectedEventId
//       );

//       // Extract the necessary data for the charts
//       const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
//       const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
//       const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

//       setEventReport(report);
//       setSelectedEventData({
//         title: selectedEvent?.title || "Selected Event",
//         volunteersJoined,
//         volunteersRequired,
//         wasteCollected,
//       });
//       setReportGenerated(true); // Set success state to true
//     } catch (err) {
//       console.error("Error generating report:", err);
//       setError("Failed to generate report. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-6 sm:p-8 lg:p-10 bg-cover bg-center" // Added bg-cover and bg-center
//       style={{ backgroundImage: `url(${blogBackground})` }} // Added inline style for background image
//     >
//       <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-6"> {/* Added bg-white and bg-opacity-90 */}
//         <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
//           <FileText className="w-8 h-8 text-green-600" />
//           Event Report Generator
//         </h1>

//         {/* Event Selection Card */}
//         <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Event</h2>
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
//             <div className="flex-grow">
//               <label htmlFor="event-select" className="block text-sm font-medium text-gray-600 mb-1">
//                 Choose a past event:
//               </label>
//               <select
//                 id="event-select"
//                 value={selectedEventId}
//                 onChange={(e) => setSelectedEventId(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out bg-white text-gray-800"
//                 disabled={loading}
//               >
//                 <option value="">-- Select an event --</option>
//                 {loading && <option disabled>Loading events...</option>}
//                 {!loading && pastEvents.length === 0 && <option disabled>No past events found.</option>}
//                 {pastEvents.map((event) => (
//                   <option key={event.eventId} value={event.eventId}>
//                     {event.title} - {new Date(event.date).toLocaleDateString()}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleGenerateReport}
//               disabled={loading || !selectedEventId}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition duration-200 ease-in-out flex items-center justify-center gap-2 min-w-[150px]"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin w-5 h-5" />
//                   Generating...
//                 </>
//               ) : (
//                 "Generate Report"
//               )}
//             </button>
//           </div>
//           {error && (
//             <div className="mt-4 flex items-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200">
//               <AlertTriangle className="w-5 h-5 mr-2" />
//               {error}
//             </div>
//           )}
//           {reportGenerated && !error && (
//             <div className="mt-4 flex items-center text-green-700 bg-green-100 p-3 rounded-lg border border-green-200">
//               <CheckCircle className="w-5 h-5 mr-2" />
//               Report generated successfully!
//             </div>
//           )}
//         </div>

//         {/* Report Output and Charts Section */}
//         {eventReport && selectedEventData && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Generated Report Card */}
//             <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 lg:col-span-2"> {/* Report spans full width */}
//               <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated Report for "{selectedEventData.title}"</h2>
//               <div className="prose max-w-none text-gray-800 leading-relaxed">
//                 <ReactMarkdown>{eventReport}</ReactMarkdown>
//               </div>
//             </div>

//             {/* Charts */}
//             <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
//               <h3 className="text-lg font-bold mb-4 text-center text-gray-700">Volunteers: Required vs Joined</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                   <XAxis dataKey="title" hide /> {/* Hide XAxis as title is redundant for single bar */}
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="volunteersJoined" fill="#34D399" name="Volunteers Joined" radius={[10, 10, 0, 0]} />
//                   <Bar dataKey="volunteersRequired" fill="#F87171" name="Volunteers Required" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//               <p className="text-center text-sm text-gray-600 mt-2">
//                 Joined: {selectedEventData.volunteersJoined}, Required: {selectedEventData.volunteersRequired}
//               </p>
//             </div>

//             <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
//               <h3 className="text-lg font-bold mb-4 text-center text-gray-700">Waste Collected (in Kg)</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                   <XAxis dataKey="title" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//               <p className="text-center text-sm text-gray-600 mt-2">
//                 Total Waste Collected: {selectedEventData.wasteCollected} Kg
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventReportPage;
// src/pages/EventReportPage.jsx









// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import blogBackground from "../assets/blogBackground.jpg";
// import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
// import {
//   getEvents,
//   generateEventReport
// } from "/api.js";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";

// const EventReportPage = () => {
//   const [pastEvents, setPastEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState("");
//   const [eventReport, setEventReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedEventData, setSelectedEventData] = useState(null);
//   const [reportGenerated, setReportGenerated] = useState(false);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const response = await getEvents();
//         const now = new Date();
//         const past = response.data.filter((event) => new Date(event.date) <= now);
//         setPastEvents(past);
//       } catch (err) {
//         setError("Failed to load events.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleGenerateReport = async (eventId) => {
//     setSelectedEventId(eventId);
//     try {
//       setLoading(true);
//       setError("");
//       setEventReport("");
//       setSelectedEventData(null);
//       setReportGenerated(false);

//       const response = await generateEventReport(eventId);
//       const report = response.data.report;

//       const selectedEvent = pastEvents.find((event) => event.eventId === eventId);
//       const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
//       const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
//       const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

//       setEventReport(report);
//       setSelectedEventData({
//         title: selectedEvent?.title || "Selected Event",
//         volunteersJoined,
//         volunteersRequired,
//         wasteCollected,
//       });
//       setReportGenerated(true);
//     } catch (err) {
//       setError("Failed to generate report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-6 sm:p-8 lg:p-10 bg-cover bg-center"
//       style={{ backgroundImage: `url(${blogBackground})` }}
//     >
//       <div className="max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-10">
//         <h1 className="text-4xl font-bold text-center text-green-700 tracking-tight">
//           📊 ReEarth Event Report Dashboard
//         </h1>

//         {/* Event Cards */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             🔍 Choose an Event to View Report
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {loading ? (
//               <div className="col-span-3 flex justify-center items-center">
//                 <Loader2 className="w-6 h-6 animate-spin text-green-500" />
//               </div>
//             ) : pastEvents.length === 0 ? (
//               <p className="text-gray-600 col-span-3">No past events found.</p>
//             ) : (
//               pastEvents.map((event) => (
//                 <button
//                   key={event.eventId}
//                   onClick={() => handleGenerateReport(event.eventId)}
//                   className={`group bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl transition-all duration-300 p-4 text-left ${
//                     selectedEventId === event.eventId
//                       ? "ring-2 ring-green-500"
//                       : ""
//                   }`}
//                 >
//                   <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700">
//                     {event.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {new Date(event.date).toLocaleDateString()}
//                   </p>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Error & Success Messages */}
//         {error && (
//           <div className="flex items-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200">
//             <AlertTriangle className="w-5 h-5 mr-2" />
//             {error}
//           </div>
//         )}
//         {reportGenerated && !error && (
//           <div className="flex items-center text-green-700 bg-green-100 p-3 rounded-lg border border-green-200">
//             <CheckCircle className="w-5 h-5 mr-2" />
//             Report generated successfully!
//           </div>
//         )}

//         {/* Report & Charts */}
//         {eventReport && selectedEventData && (
//           <div className="space-y-10">
//             {/* Markdown Report */}
//             <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">
//                 📄 Report: {selectedEventData.title}
//               </h2>
//               <div className="prose max-w-none text-gray-700">
//                 <ReactMarkdown>{eventReport}</ReactMarkdown>
//               </div>
//             </div>

//             {/* Chart 1: Volunteers */}
//             <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//               <h3 className="text-lg font-bold text-center text-gray-800 mb-4">
//                 🧍 Volunteers: Joined vs Required
//               </h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={[selectedEventData]}>
//                   <XAxis dataKey="title" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="volunteersJoined" fill="#34D399" name="Joined" radius={[10, 10, 0, 0]} />
//                   <Bar dataKey="volunteersRequired" fill="#F87171" name="Required" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Chart 2: Waste Collected */}
//             <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//               <h3 className="text-lg font-bold text-center text-gray-800 mb-4">
//                 ♻️ Waste Collected (in Kg)
//               </h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={[selectedEventData]}>
//                   <XAxis dataKey="title" hide />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventReportPage;








// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import blogBackground from '../assets/blogBackground.jpg'; // Import the background image
// import { FileText, Loader2, AlertTriangle, CheckCircle } from "lucide-react"; // Added CheckCircle for success
// import { getEvents, generateEventReport } from "/api.js"; // Assuming api.js is correctly linked
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const EventReportPage = () => {
//   const [pastEvents, setPastEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState("");
//   const [eventReport, setEventReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedEventData, setSelectedEventData] = useState(null);
//   const [reportGenerated, setReportGenerated] = useState(false); // New state for successful generation

//   // Fetch all events to populate the dropdown
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true); // Set loading true while fetching events
//         const response = await getEvents();
//         const now = new Date();
//         // Filter for past events to show in the dropdown.
//         const past = response.data.filter(event => new Date(event.date) <= now);
//         setPastEvents(past);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events. Please try again later.");
//       } finally {
//         setLoading(false); // Set loading false after fetching events
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Generate event report and prepare chart data
//   const handleGenerateReport = async (eventId) => { // Modified to accept eventId directly
//     setSelectedEventId(eventId); // Set selected event ID when a card is clicked
//     try {
//       setLoading(true);
//       setError("");
//       setEventReport("");
//       setSelectedEventData(null);
//       setReportGenerated(false); // Reset success state

//       // Call the API to generate the text report
//       const response = await generateEventReport(eventId); // Use passed eventId
//       const report = response.data.report;

//       // Find the selected event from the list to get its data for the charts
//       const selectedEvent = pastEvents.find(
//         (event) => event.eventId === eventId // Use passed eventId
//       );

//       // Extract the necessary data for the charts
//       const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
//       const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
//       const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

//       setEventReport(report);
//       setSelectedEventData({
//         title: selectedEvent?.title || "Selected Event",
//         volunteersJoined,
//         volunteersRequired,
//         wasteCollected,
//       });
//       setReportGenerated(true); // Set success state to true
//     } catch (err) {
//       console.error("Error generating report:", err);
//       setError("Failed to generate report. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-6 sm:p-8 lg:p-10 bg-cover bg-center"
//       style={{ backgroundImage: `url(${blogBackground})` }}
//     >
//       <div className="max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-10">
//         <h1 className="text-4xl font-bold text-center text-green-700 tracking-tight">
//           📊 ReEarth Event Report Dashboard
//         </h1>

//         {/* Event Cards for Selection */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             🔍 Choose an Event to View Report
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {loading ? (
//               <div className="col-span-3 flex justify-center items-center py-10">
//                 <Loader2 className="w-10 h-10 animate-spin text-green-500" />
//                 <p className="ml-3 text-lg text-gray-600">Fetching events...</p>
//               </div>
//             ) : pastEvents.length === 0 ? (
//               <p className="text-gray-600 col-span-3 text-center py-10">No past events found to generate reports.</p>
//             ) : (
//               pastEvents.map((event) => (
//                 <button
//                   key={event.eventId}
//                   onClick={() => handleGenerateReport(event.eventId)}
//                   className={`group bg-green-50 border border-green-100 rounded-xl shadow hover:shadow-xl transition-all duration-300 p-4 text-left cursor-pointer
//                     ${selectedEventId === event.eventId
//                       ? "ring-4 ring-green-500 border-green-500 scale-105" // Highlight selected card
//                       : "hover:bg-green-100" // Changed hover background to a lighter green
//                     }`}
//                   disabled={loading} // Disable cards while report is generating
//                 >
//                   <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700">
//                     {event.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1"> {/* Changed text-gray-500 to text-gray-600 for better contrast */}
//                     Date: {new Date(event.date).toLocaleDateString()}
//                   </p>
//                   {selectedEventId === event.eventId && (
//                     <span className="mt-2 text-green-600 font-semibold flex items-center gap-1">
//                       <CheckCircle size={16} /> Selected
//                     </span>
//                   )}
//                 </button>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Error & Success Messages */}
//         {error && (
//           <div className="flex items-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200 shadow-sm">
//             <AlertTriangle className="w-5 h-5 mr-2" />
//             {error}
//           </div>
//         )}
//         {reportGenerated && !error && (
//           <div className="flex items-center text-green-700 bg-green-100 p-3 rounded-lg border border-green-200 shadow-sm">
//             <CheckCircle className="w-5 h-5 mr-2" />
//             Report generated successfully!
//           </div>
//         )}

//         {/* Report & Charts Display */}
//         {eventReport && selectedEventData && (
//           <div className="space-y-10">
//             {/* Markdown Report Card */}
//             <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 📄 Event Report: {selectedEventData.title}
//               </h2>
//               <div className="prose max-w-none text-gray-700 leading-relaxed">
//                 <ReactMarkdown>{eventReport}</ReactMarkdown>
//               </div>
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Chart 1: Volunteers */}
//               <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
//                   🧍 Volunteers: Joined vs Required
//                 </h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <XAxis dataKey="title" hide />
//                     <YAxis />
//                     <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                     <Legend wrapperStyle={{ paddingTop: '10px' }} />
//                     <Bar dataKey="volunteersJoined" fill="#34D399" name="Joined" radius={[10, 10, 0, 0]} />
//                     <Bar dataKey="volunteersRequired" fill="#F87171" name="Required" radius={[10, 10, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//                 <p className="text-center text-sm text-gray-600 mt-4">
//                   **Joined:** {selectedEventData.volunteersJoined} | **Required:** {selectedEventData.volunteersRequired}
//                 </p>
//               </div>

//               {/* Chart 2: Waste Collected */}
//               <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
//                   ♻️ Waste Collected (in Kg)
//                 </h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <XAxis dataKey="title" hide />
//                     <YAxis />
//                     <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                     <Legend wrapperStyle={{ paddingTop: '10px' }} />
//                     <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" radius={[10, 10, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//                 <p className="text-center text-sm text-gray-600 mt-4">
//                   **Total Waste Collected:** {selectedEventData.wasteCollected} Kg
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventReportPage;
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import blogBackground from "../assets/blogBackground.jpg";
import { FileText, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { getEvents, generateEventReport } from "/api.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EventReportPage = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventReport, setEventReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        const now = new Date();
        const past = response.data.filter(event => new Date(event.date) <= now);
        setPastEvents(past);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleGenerateReport = async (eventId) => {
    setSelectedEventId(eventId);
    try {
      setLoading(true);
      setError("");
      setEventReport("");
      setSelectedEventData(null);
      setReportGenerated(false);

      const response = await generateEventReport(eventId);
      const report = response.data.report;

      const selectedEvent = pastEvents.find((event) => event.eventId === eventId);
      const volunteersJoined = selectedEvent?.volunteersJoined?.length || 0;
      const volunteersRequired = selectedEvent?.volunteersNeeded || 0;
      const wasteCollected = selectedEvent?.wasteTreated?.totalKg || 0;

      setEventReport(report);
      setSelectedEventData({
        title: selectedEvent?.title || "Selected Event",
        volunteersJoined,
        volunteersRequired,
        wasteCollected,
      });
      setReportGenerated(true);
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 sm:p-8 lg:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${blogBackground})` }}
    >
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-10">
        <h1 className="text-4xl font-bold text-center text-green-700 tracking-tight">
          ReEarth Event Report Dashboard
        </h1>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Choose an Event to View Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center py-10">
                <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                <p className="ml-3 text-lg text-gray-600">Fetching events...</p>
              </div>
            ) : pastEvents.length === 0 ? (
              <p className="text-gray-600 col-span-3 text-center py-10">
                No past events found to generate reports.
              </p>
            ) : (
              pastEvents.map((event) => (
                <button
                  key={event.eventId}
                  onClick={() => handleGenerateReport(event.eventId)}
                  className={`group bg-gradient-to-br from-green-50 to-white border rounded-xl shadow-lg transition-all duration-300 p-5 text-left cursor-pointer
                    ${
                      selectedEventId === event.eventId
                        ? "ring-4 ring-green-400 border-green-300 scale-105"
                        : "hover:scale-[1.02] border-gray-200"
                    }`}
                  disabled={loading}
                >
                  <h3 className="text-lg font-bold text-green-800 flex items-center gap-2 group-hover:text-green-600">
                    <FileText size={18} /> {event.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  {selectedEventId === event.eventId && (
                    <span className="mt-2 text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle size={16} /> Selected
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200 shadow-sm">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        {reportGenerated && !error && (
          <div className="flex items-center text-green-800 bg-green-100 p-3 rounded-lg border border-green-300 shadow-sm animate-pulse">
            <CheckCircle className="w-5 h-5 mr-2" />
            Report generated successfully!
          </div>
        )}

        {/* Report Section */}
        {eventReport && selectedEventData && (
          <div className="space-y-10">
            {/* Markdown Report Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                Event Report: {selectedEventData.title}
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <ReactMarkdown>{eventReport}</ReactMarkdown>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Volunteers Chart */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
                  🧍 Volunteers: Joined vs Required
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="title" hide />
                    <YAxis />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                    <Bar dataKey="volunteersJoined" fill="#34D399" name="Joined" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="volunteersRequired" fill="#F87171" name="Required" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-gray-700 mt-4">
                  <strong>Joined:</strong> {selectedEventData.volunteersJoined} |{" "}
                  <strong>Required:</strong> {selectedEventData.volunteersRequired}
                </p>
              </div>

              {/* Waste Collected Chart */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
                  ♻️ Waste Collected (in Kg)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[selectedEventData]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="title" hide />
                    <YAxis />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                    <Bar dataKey="wasteCollected" fill="#60A5FA" name="Waste Collected" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-gray-700 mt-4">
                  <strong>Total Waste Collected:</strong> {selectedEventData.wasteCollected} Kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventReportPage;
