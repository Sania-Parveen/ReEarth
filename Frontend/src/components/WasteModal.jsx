// src/components/WasteModal.jsx

import React, { useState, useEffect } from "react";
import { logWaste, getJoinedEvents } from "/api.js";

const WasteModal = ({ isOpen, onClose, userId, onAddWaste }) => {
  const [wasteData, setWasteData] = useState([{ type: "", kg: "" }]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await getJoinedEvents(userId);
        setJoinedEvents(res.data);
      } catch (err) {
        console.error("Failed to load joined events", err);
      }
    };

    if (isOpen) {
      fetchJoinedEvents();
    }
  }, [userId, isOpen]);

  const addWasteField = () => {
    setWasteData([...wasteData, { type: "", kg: "" }]);
  };

  const handleWasteChange = (index, field, value) => {
    const newWasteData = [...wasteData];
    newWasteData[index][field] = value;
    setWasteData(newWasteData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEventId) {
      alert("Please select an event first.");
      return;
    }

    // Aggregate values by waste type
    const wasteTotals = { green: 0, blue: 0, black: 0 };

    for (let waste of wasteData) {
      const { type, kg } = waste;
      if (["green", "blue", "black"].includes(type)) {
        wasteTotals[type] += parseFloat(kg || 0);
      }
    }

    const payload = {
      userId,
      eventId: selectedEventId,
      ...wasteTotals,
    };

    try {
      const res = await logWaste(payload);
      console.log("Response:", res.data);
      alert("Waste logged successfully!");

      setWasteData([{ type: "", kg: "" }]);
      setSelectedEventId("");
      onClose();
      onAddWaste(); // Optional callback to refresh parent UI
    } catch (err) {
      console.error("Logging error:", err.response?.data || err.message);
      alert("Failed to log waste.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Waste</h2>

        {/* Event Selection */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Event
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="mb-4 w-full border rounded px-2 py-1"
        >
          <option value="">-- Select Joined Event --</option>
          {joinedEvents.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>

        <form onSubmit={handleSubmit}>
          {wasteData.map((waste, index) => (
            <div key={index} className="mb-4">
              <select
                value={waste.type}
                onChange={(e) => handleWasteChange(index, "type", e.target.value)}
                className="mr-2 border rounded px-2 py-1"
                required
              >
                <option value="">Select Type</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
              </select>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Kg"
                value={waste.kg}
                onChange={(e) => handleWasteChange(index, "kg", e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addWasteField}
            className="mb-4 bg-gray-100 px-3 py-1 rounded text-sm"
          >
            + Add More Waste
          </button>

          <button
            type="submit"
            className="block w-full bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit Waste
          </button>
        </form>
      </div>
    </div>
  );
};

export default WasteModal;
