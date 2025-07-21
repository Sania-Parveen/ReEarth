import express from 'express';
import {
  createEvent,
  joinEvent,
  getEventById,
  logWaste,
   getAllEvents,
   updateEvent,
   deleteEvent,
} from '../controllers/eventController.js';
import Event from '../models/Event.js';

const router = express.Router();

router.post('/create', createEvent);
router.post('/:eventId/join', joinEvent);
router.get('/:eventId', getEventById);
router.post('/:eventId/waste', logWaste);
router.get('/', getAllEvents); 
router.put("/:id", updateEvent);      // Edit event
router.delete("/:id", deleteEvent);   
router.get('/joined/:userId', async (req, res) => {
  try {
    const events = await Event.find({ volunteersJoined: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch joined events' });
  }
});


export default router;
