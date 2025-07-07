import express from 'express';
import {
  createEvent,
  joinEvent,
  getEventById,
  logWaste
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent);
router.post('/:eventId/join', joinEvent);
router.get('/:eventId', getEventById);
router.post('/:eventId/waste', logWaste);

export default router;
