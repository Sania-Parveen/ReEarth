import React from "react";
import bgImage from "../assets/ec.jpg";

const EventCard = ({ event, currentUser, onJoin, onEdit, onDelete }) => {
  const {
    _id,
    title,
    location,
    date,
    time,
    description,
    wasteType,
    volunteersNeeded,
    volunteersJoined = [],
    createdBy,
  } = event;

  const joined = volunteersJoined.includes(currentUser);
  const alreadyJoined = event.volunteersJoined.includes(currentUser);

  return (
    <div
      className="w-full h-auto bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-black">
        <h3 className="text-xl font-bold mb-2 capitalize">{title}</h3>
        {description && (
          <p className="text-sm text-gray-700 mb-2 line-clamp-3">
            {description}
          </p>
        )}
        <p className="mb-1">
          <span className="font-semibold">📍 Location:</span> {location}
        </p>
        <p className="mb-1">
          <span className="font-semibold">📅 Date:</span>{" "}
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="mb-1">
          <span className="font-semibold">⏰ Time:</span> {time}
        </p>
        <p className="mb-1">
          <span className="font-semibold">🗑 Waste Type:</span> {wasteType}
        </p>
        <p className="mb-2">
          <span className="font-semibold">👥</span> {volunteersJoined.length} /{" "}
          {volunteersNeeded} joined
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        {/* Map */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition"
          onClick={() => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`;
            window.open(mapUrl, "_blank");
          }}
        >
          Map
        </button>

        {/* Join / Joined */}
        {!joined ? (
          <button
            disabled={alreadyJoined}
            onClick={() => onJoin(event.eventId)}
            className={`px-4 py-1 rounded-md text-white transition ${
              alreadyJoined
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {alreadyJoined ? "✅ Joined" : "Join"}
          </button>
        ) : (
          <span className="px-4 py-1 bg-emerald-700 text-white rounded-md">
            Joined
          </span>
        )}

        {/* Edit/Delete (creator only) */}
        {currentUser === createdBy && (
          <>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md transition"
              onClick={() => onEdit()}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
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
