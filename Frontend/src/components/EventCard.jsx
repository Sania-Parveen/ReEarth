import React from "react";
import bgImage from "../assets/ec.jpg";

const EventCard = ({ event, currentUser, onJoin, onEdit, onDelete }) => {
  const {
    _id,
    title,
    location,
    date,
    time,
    wasteType,
    volunteersNeeded,
    volunteersJoined = [],
    createdBy,
  } = event;

  const joined = volunteersJoined.includes(currentUser);
  const alreadyJoined = event.volunteersJoined.includes(currentUser);

  return (
    <div
      className="w-[380px] h-[300px] rounded-lg shadow-lg p-6 bg-white/60 backdrop-blur-md text-black mr-4 flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>
        <strong>📍 Location:</strong> {location}
      </p>
      <p>
        <strong>📅 Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <p>
        <strong>⏰ Time:</strong> {time}
      </p>
      <p>
        <strong>🗑 Waste Type:</strong> {wasteType}
      </p>
      <p className="text-sm">
        👥 {volunteersJoined.length} / {volunteersNeeded} joined
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`;
            window.open(mapUrl, "_blank");
          }}
        >
          Map
        </button>

        {/* Join or Joined */}
        {!joined ? (
          <button
            disabled={alreadyJoined}
            onClick={() => onJoin(event.eventId)}
            className={`${
              alreadyJoined
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-3 py-1 rounded`}
          >
            {alreadyJoined ? "✅ Joined" : "Join"}
          </button>
        ) : (
          <span className="px-3 py-1 bg-green-700 text-white rounded-md">
            Joined
          </span>
        )}

        {currentUser === createdBy && (
          <>
            <button
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => onEdit()}
            >
              Edit
            </button>
            <button
              className="bg-green-300 hover:bg-green-400 text-white px-3 py-1 rounded"
              onClick={() => onDelete(_id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
