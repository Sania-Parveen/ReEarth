import Event from '../models/Event.js';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch'; 
import User from '../models/userModel.js';

export const createEvent = async (req, res) => {
  try {
    const { title, location, date,time, wasteType, volunteersNeeded, createdBy } = req.body;

    // Geocode the location to get lat/lng
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

// Log waste by classification
export const logWaste = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { volunteerId, type, amount } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(volunteerId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    event.wasteLogs.push({
      volunteerId,
      volunteerName: user.name, // 👈 Store volunteer name
      type,
      amount,
    });

    await event.save();

    res.status(200).json({ message: 'Waste logged successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log waste' });
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

