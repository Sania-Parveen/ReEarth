import Event from '../models/Event.js';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch'; 

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to safely fetch coordinates from Nominatim API
async function fetchCoordinates(location) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  const headers = {
    "User-Agent": "ReEarthApp/1.0 (sakshisood678@gmail.com)" // valid, reachable email
  };

  const response = await fetch(url, { headers });

  const contentType = response.headers.get("content-type") || "";

  // Check if status OK and content-type is JSON
  if (!response.ok || !contentType.includes("application/json")) {
    const text = await response.text(); // HTML or error
    console.error(`Geocoding API error: HTTP ${response.status}`, text);
    throw new Error(`Geocoding API error: HTTP ${response.status} - ${text.slice(0, 120)}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No coordinates found for location");
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };
}


export const createEvent = async (req, res) => {
  try {
    const { title, location, date, time, wasteType, volunteersNeeded, createdBy, description } = req.body;

    let coordinates;
    try {
      coordinates = await fetchCoordinates(location);
    } catch (geoError) {
      return res.status(400).json({ error: geoError.message });
    }

    const event = new Event({
      title,
      description,
      location,
      date,
      time,
      wasteType,
      volunteersNeeded,
      volunteersJoined: [],
      createdBy,
      eventId: nanoid(6),
      coordinates
    });

    await event.save();
    res.status(201).json(event);

  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, date, time, wasteType, volunteersNeeded } = req.body;

    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    let latitude = existingEvent.coordinates?.lat;
    let longitude = existingEvent.coordinates?.lng;

    if (location && location !== existingEvent.location) {
      try {
        const coordinates = await fetchCoordinates(location);
        latitude = coordinates.lat;
        longitude = coordinates.lng;
      } catch (geoError) {
        return res.status(400).json({ error: geoError.message });
      }
    }

    existingEvent.title = title || existingEvent.title;
    existingEvent.description = description || existingEvent.description;
    existingEvent.location = location || existingEvent.location;
    existingEvent.date = date || existingEvent.date;
    existingEvent.time = time || existingEvent.time;
    existingEvent.wasteType = wasteType || existingEvent.wasteType;
    existingEvent.volunteersNeeded = volunteersNeeded || existingEvent.volunteersNeeded;
    existingEvent.coordinates = { lat: latitude, lng: longitude };

    const updatedEvent = await existingEvent.save();
    res.json(updatedEvent);

  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event", error });
  }
};



export const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const event = await Event.findOne({ eventId });


    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.volunteersJoined.includes(userId))
      return res.status(400).json({ error: 'Already joined' });

    event.volunteersJoined.push(userId);
    await event.save();

    res.json({ message: 'Joined successfully', volunteersJoined: event.volunteersJoined.length });
  } catch (err) {
    console.error("Join Error:", err); // Add this to see exact error in terminal
    res.status(500).json({ error: 'Failed to join event' });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId }).populate('volunteersJoined');
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Update event


// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
};

// Get all past events (where event date < today)

export const getPastEvents = async (req, res) => {
  try {
    const now = new Date();
    const pastEvents = await Event.find({ date: { $lt: now } });
    res.json(pastEvents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
};


export const generateEventReport = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ eventId })
      .populate("volunteersJoined", "name email")
      .populate("wasteTreated.records.userId", "name email");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const wasteDetails = event.wasteTreated.records.length
      ? event.wasteTreated.records
          .map(w => `- ${w.type}: ${w.kg} kg (by ${w.userId?.name || "Unknown"})`)
          .join("\n")
      : "No waste data logged yet.";

    const prompt = `
Generate a fun, engaging, and detailed event report for an environmental event with the following details:

Title: ${event.title}
Location: ${event.location}
Date: ${event.date}
Time: ${event.time}
Type of Waste Targeted: ${event.wasteType}
Target Volunteers: ${event.volunteersNeeded}
Volunteers Joined: ${event.volunteersJoined.length}

Waste Treated:
${wasteDetails}

Add:
1. A creative summary of the event's impact.
2. A motivational closing line to encourage participation.
3. Comment if the volunteer turnout was high, average, or low.
4. Mention any standout facts based on the data (e.g., highest waste type treated).
Make the tone energetic and community-focused.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ report: text });
  } catch (error) {
    console.error("Report error:", error.message);
    res.status(500).json({ error: "Failed to generate event report" });
  }
};
