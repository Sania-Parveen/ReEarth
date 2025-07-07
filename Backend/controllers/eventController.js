import Event from '../models/Event.js';
import { nanoid } from 'nanoid';

export const createEvent = async (req, res) => {
  try {
    const { title, location, date, wasteType, volunteersNeeded, createdBy } = req.body;

    const event = new Event({
      title,
      location,
      date,
      wasteType,
      volunteersNeeded,
      volunteersJoined: [],
      createdBy,
      eventId: nanoid(6) // generates short id like "1a2b3c"
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
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
  const { eventId } = req.params;
  const { userId, blackKg = 0, greenKg = 0, blueKg = 0 } = req.body;

  try {
    const event = await Event.findOne({ eventId });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const total = blackKg + greenKg + blueKg;

    const newRecord = {
      userId,
      blackKg,
      greenKg,
      blueKg,
    };

    event.wasteTreated.records.push(newRecord);
    event.wasteTreated.totalKg += total;

    await event.save();
    res.json({ message: 'Waste logged successfully', newRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log waste' });
  }
};

