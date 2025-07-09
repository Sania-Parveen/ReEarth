import React, { useState } from 'react';
import EventCard from '../components/EventCard';

function EventPage() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    dateTime: '',
    wasteType: '',
    target: '',
    volunteers: ''
  });

  const handleCreate = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...formData, volunteers: parseInt(formData.volunteers) || 0 };
    setEvents([...events, newEvent]);
    setFormData({ title: '', location: '', dateTime: '', wasteType: '', target: '', volunteers: '' });
    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-900">🌊 Beach Cleanup Events</h1>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Create
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border p-6 rounded-xl bg-white shadow-lg max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Event</h2>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Event Title" required />
          <input name="location" value={formData.location} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Location" required />
          <input name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Date & Time" required />
          <input name="wasteType" value={formData.wasteType} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Waste Type (e.g., Plastic, Glass)" required />
          <input name="target" value={formData.target} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Target (e.g., Clean 1km beach)" required />
          <input name="volunteers" type="number" value={formData.volunteers} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Volunteers Attending" required />
          <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">Save Event</button>
        </form>
      )}

      {events.map((event, idx) => (
        <EventCard key={idx} event={event} />
      ))}
    </div>
  );
}

export default EventPage;
