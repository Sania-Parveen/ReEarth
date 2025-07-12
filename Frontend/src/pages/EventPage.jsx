// File: EventPage.jsx
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import axios from 'axios';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    wasteType: '',
    volunteersNeeded: '',
    createdBy: '' // Fill with user ID if auth is added
  });

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/events/create', formData);
      setEvents([...events, res.data]);
      setShowForm(false);
      setFormData({ title: '', location: '', date: '', wasteType: '', volunteersNeeded: '', createdBy: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-900">🌊 Beach Cleanup Events</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Create
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border p-6 rounded-xl bg-white shadow-lg max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Event</h2>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Event Title" required />
          <input name="location" value={formData.location} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Location" required />
          <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
          <input name="wasteType" value={formData.wasteType} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Waste Type (e.g., Plastic, Glass)" required />
          <input name="volunteersNeeded" type="number" value={formData.volunteersNeeded} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Volunteers Needed" required />
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
