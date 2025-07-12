// File: EventCard.jsx
import React, { useState } from 'react';
import axios from 'axios';

function WasteLogger({ eventId, userId }) {
  const [form, setForm] = useState({
    blackKg: '',
    greenKg: '',
    blueKg: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/events/${eventId}/waste`, {
        ...form,
        userId
      });
      alert("✅ Waste logged successfully!");
      setForm({ blackKg: '', greenKg: '', blueKg: '' });
    } catch (err) {
      console.error("Error logging waste:", err);
      alert("❌ Failed to log waste");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Log Waste Collected</h3>
      <input type="number" name="blackKg" placeholder="Black bin (kg)" value={form.blackKg} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="number" name="greenKg" placeholder="Green bin (kg)" value={form.greenKg} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="number" name="blueKg" placeholder="Blue bin (kg)" value={form.blueKg} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
    </form>
  );
}

function EventCard({ event }) {
  return (
    <div className="border-2 rounded-xl shadow-md p-4 bg-white w-full md:w-3/4 mx-auto my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-blue-800">{event.title}</h2>
          <p><strong>📍 Location:</strong> {event.location}</p>
          <p><strong>⏰ Date & Time:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>♻️ Waste Type:</strong> {event.wasteType}</p>
          <p><strong>🎯 Volunteers Needed:</strong> {event.volunteersNeeded}</p>
          <p><strong>🙋 Joined:</strong> {event.volunteersJoined?.length || 0}</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-8">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Join</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Map</button>
        </div>
      </div>

      {/* Waste Logging Form */}
      <WasteLogger eventId={event.eventId} userId="662a1b235fe8a12c7c0c1234" />
    </div>
  );
}

export default EventCard;
