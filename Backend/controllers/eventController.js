import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import { nanoid } from "nanoid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// 📌 CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, location, date, time, wasteType, volunteersNeeded, createdBy, description } = req.body;

    // Validate required fields
    if (!title || !location || !date || !time || !wasteType || !volunteersNeeded || !createdBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Geocode the location to get lat/lng
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your-email@example.com)"
        }
      }
    );

    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) {
      return res.status(400).json({ error: "Invalid location, coordinates not found" });
    }

    const latitude = parseFloat(geoData[0].lat);
    const longitude = parseFloat(geoData[0].lon);

    // Create event
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
      eventId: nanoid(6), // short readable ID
      coordinates: {
        lat: latitude,
        lng: longitude
      }
    });

    await event.save();

    // TODO: Send notifications to subscribed users (can be implemented later)
    // notificationService.notifyUpcomingEvent(event);

    res.status(201).json(event);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
};
// 📌 GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .populate("volunteersJoined", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// 📌 GET EVENT BY CUSTOM ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId })
      .populate("createdBy", "name email")
      .populate("volunteersJoined", "name email")
      .populate("wasteTreated.records.userId", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// 📌 JOIN EVENT
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId });

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.volunteersJoined.includes(req.user._id)) {
      return res.status(400).json({ message: "You already joined this event" });
    }

    event.volunteersJoined.push(req.user._id);
    event.joinedUsers.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "Joined event successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error joining event", error });
  }
};

// 📌 LOG WASTE TREATED
export const logWaste = async (req, res) => {
  try {
    const { type, kg } = req.body;

    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) return res.status(404).json({ message: "Event not found" });

    const wasteRecord = {
      userId: req.user._id,
      type,
      kg,
    };

    event.wasteTreated.records.push(wasteRecord);
    event.wasteTreated.totalKg += kg;

    await event.save();

    res.status(200).json({ message: "Waste logged successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error logging waste", error });
  }
};

// 📌 EDIT EVENT (Only Creator)
export const editEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this event" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

// 📌 DELETE EVENT (Only Creator)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

// 📌 GET TOP WASTE COLLECTOR
export const getTopCollector = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId })
      .populate("wasteTreated.records.userId", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    const wasteByUser = {};
    event.wasteTreated.records.forEach(record => {
      const id = record.userId._id;
      if (!wasteByUser[id]) wasteByUser[id] = 0;
      wasteByUser[id] += record.kg;
    });

    const topCollectorId = Object.keys(wasteByUser).reduce((a, b) =>
      wasteByUser[a] > wasteByUser[b] ? a : b
    );

    const topCollector = await User.findById(topCollectorId).select("name email");

    res.status(200).json({ topCollector, totalKg: wasteByUser[topCollectorId] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching top collector", error });
  }
} 

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
