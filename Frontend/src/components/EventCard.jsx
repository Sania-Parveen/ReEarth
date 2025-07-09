import React from 'react';

function EventCard({ event }) {
  return (
    <div className="border-2 rounded-xl shadow-md p-4 bg-white w-full md:w-3/4 mx-auto my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-blue-800">{event.title}</h2>
          <p><strong>📍 Location:</strong> {event.location}</p>
          <p><strong>⏰ Date & Time:</strong> {event.dateTime}</p>
          <p><strong>♻️ Waste Type:</strong> {event.wasteType}</p>
          <p><strong>🎯 Target:</strong> {event.target}</p>
          <p><strong>🙋 Volunteers Attending:</strong> {event.volunteers}</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-8">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Join</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Map</button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
