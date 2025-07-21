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
import bgImage from "../assets/EventCard3.jpg";

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
    // <div className="p-4">
    //   <div
    //     className="min-h-screen bg-cover bg-center bg-no-repeat"
    //     style={{ bgImage: "url('/your-background.png')" }}
    //   >
    //     <h2 className="text-2xl font-bold">🌱 Environmental Events</h2>
    //     <button
    //       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    //       onClick={() => {
    //         setShowForm(!showForm);
    //         setEditEvent(null);
    //       }}
    //     >
    //       + Create
    //     </button>
    //   </div>

    //   {showForm && (
    //     <CreateEventForm
    //       onSubmit={handleCreate}
    //       onCancel={() => setShowForm(false)}
    //     />
    //   )}

    //   {editEvent && (
    //     <CreateEventForm
    //       initialData={editEvent}
    //       onSubmit={(data) => handleUpdate(editEvent._id, data)}
    //       onCancel={() => setEditEvent(null)}
    //     />
    //   )}

    //   <div className="flex gap-4 overflow-x-auto py-4">
    //     {events.map((event) => (
    //       <EventCard
    //         key={event.eventId}
    //         event={event}
    //         currentUser={currentUserId}
    //         onJoin={handleJoin}
    //         onDelete={handleDelete}
    //         onEdit={() => {
    //             setEditEvent(event);
    //             setShowForm(false);
    //           }}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // );
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="bg-white/60 backdrop-blur-sm p-4 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">🌱 Environmental Events</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              setShowForm(!showForm);
              setEditEvent(null);
            }}
          >
            + Create
          </button>
        </div>

        {/* Create or Edit Form */}
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

        {/* Event Cards */}
        <div className="flex gap-4 overflow-x-auto py-4">
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
