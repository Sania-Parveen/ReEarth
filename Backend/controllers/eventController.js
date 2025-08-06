import Event from '../models/Event.js';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';
import User from '../models/userModel.js';

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, location, date, time, wasteType, volunteersNeeded, createdBy } = req.body;

    // Geocode location to get lat/lng
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return res.status(400).json({ error: 'Invalid location, coordinates not found' });
    }

    const latitude = parseFloat(geoData[0].lat);
    const longitude = parseFloat(geoData[0].lon);

    const event = new Event({
      title,
      location,
      date,
      time,
      wasteType,
      volunteersNeeded,
      volunteersJoined: [],
      createdBy,
      eventId: nanoid(6),
      coordinates: {
        lat: latitude,
        lng: longitude
      }
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Join Event
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
    console.error("Join Error:", err);
    res.status(500).json({ error: 'Failed to join event' });
  }
};

// Get Event By ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId }).populate('volunteersJoined');
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Log Waste (Fixed version)
export const logWaste = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { volunteerId, type, amount } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(volunteerId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!event.wasteTreated) {
      event.wasteTreated = { totalKg: 0, records: [] };
    }

    event.wasteTreated.records.push({
      userId: volunteerId,
      type,
      kg: amount,
    });

    event.wasteTreated.totalKg = (event.wasteTreated.totalKg || 0) + amount;

    await event.save();

    res.status(200).json({ message: 'Waste logged successfully' });
  } catch (err) {
    console.error("Error logging waste:", err);
    res.status(500).json({ error: 'Failed to log waste' });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

// Delete Event
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

// Get Past Events
export const getPastEvents = async (req, res) => {
  try {
    const now = new Date();
    const pastEvents = await Event.find({ date: { $lte: now } });
    console.log(`Found ${pastEvents.length} past events.`);
    res.json(pastEvents);
  } catch (err) {
    console.error("Error fetching past events:", err.message);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
};

// Generate Event Report
export const generateEventReport = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log(`Received request to generate report for eventId: ${eventId}`);

    const event = await Event.findOne({ eventId });
    if (!event) {
      console.error(`Error: Event with eventId ${eventId} not found.`);
      return res.status(404).json({ error: "Event not found" });
    }

    const wasteData = (event.wasteTreated && event.wasteTreated.records)
      ? event.wasteTreated.records
      : [];

    const prompt = `
Generate a fun, engaging, and detailed event report for an environmental event with the following details:

Title: ${event.title}
Location: ${event.location}
Date: ${new Date(event.date).toLocaleDateString()}
Time: ${event.time}
Type of Waste Targeted: ${event.wasteType}
Target Volunteers: ${event.volunteersNeeded || 'N/A'}
Volunteers Joined: ${(event.volunteersJoined || []).length}
Total Waste Treated: ${event.wasteTreated ? event.wasteTreated.totalKg : 0} kg

Waste Treated by type (in kg):
${
  wasteData.length > 0
    ? wasteData.map(w => `- ${w.type}: ${w.kg} kg`).join('\n')
    : 'No waste data logged yet.'
}

Add:
1. A creative summary of the event's impact.
2. A motivational closing line to encourage participation.
3. Comment if the volunteer turnout was high, average, or low based on the target volunteers.
4. Mention any standout facts based on the data (e.g., highest waste type treated).
Make the tone energetic and community-focused.
`;

    console.log("Sending prompt to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error("Gemini API returned an empty or invalid response.");
      return res.status(500).json({ error: "Failed to generate report from API." });
    }

    console.log("Report successfully generated.");
    res.json({ report: text });
  } catch (error) {
    console.error("Report generation error:", error);
    if (error.response) {
      console.error("API error response status:", error.response.status);
      console.error("API error response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to generate event report" });
  }
};
