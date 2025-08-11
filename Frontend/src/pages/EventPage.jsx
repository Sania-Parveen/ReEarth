import React, { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  joinEvent,
  deleteEvent,
  updateEvent,
} from "/api.js";
import EventCard from "../components/EventCard";
import CreateEventForm from "../components/CreateEventForm";
import bgImage from "../assets/image.png";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const handleCreate = async (eventData) => {
    await createEvent(eventData);
    setShowForm(false);
    fetchEvents();
  };
  // const handleJoin = async (eventId) => {
  //   try {
  //     const res = await joinEvent(eventId, currentUserId);
  //     console.log("Joined successfully:", res.data);
  //   } catch (err) {
  //     console.error("Join failed:", err.response?.data || err.message);
  //   }
  // };
  const handleJoin = async (eventId) => {
    try {
      const res = await joinEvent(eventId, currentUserId);

      // Update local event state to reflect joined user
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === eventId
            ? {
                ...event,
                volunteersJoined: [...event.volunteersJoined, currentUserId],
              }
            : event
        )
      );

      console.log("Joined successfully:", res.data);
    } catch (err) {
      console.error("Join failed:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    fetchEvents();
  };

  const handleUpdate = async (eventId, updatedData) => {
    await updateEvent(eventId, updatedData);
    setEditEvent(null);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Glassy container */}
      <div className="bg-white/60 backdrop-blur-md rounded-none p-0 shadow-none w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            🌱 Environmental Events
          </h2>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            onClick={() => {
              setShowForm(!showForm);
              setEditEvent(null);
            }}
          >
            + Create
          </button>
        </div>

        {/* Forms */}
        {showForm && (
          <CreateEventForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}
        {editEvent && (
          <CreateEventForm
            initialData={editEvent}
            onSubmit={(data) => handleUpdate(editEvent._id, data)}
            onCancel={() => setEditEvent(null)}
          />
        )}

        {/* Scrollable Card Section */}
        <div className="flex flex-col gap-6 px-2 sm:px-4 md:px-6">
          {events.map((event) => (
            <EventCard
              key={event.eventId}
              event={event}
              currentUser={currentUserId}
              onJoin={handleJoin}
              onDelete={handleDelete}
              onEdit={() => {
                setEditEvent(event);
                setShowForm(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
