// routes/wasteRoutes.js
import express from 'express';
import {
  logWaste,
  getUserWasteLogs,
  getDashboardSummary,
  updateWasteLog,
  deleteWasteLog
} from '../controllers/wasteController.js';

const router = express.Router();

router.post('/log', logWaste);
router.get('/user/:userId', getUserWasteLogs);
router.get('/dashboard/summary/:userId', getDashboardSummary);
router.put('/:id', updateWasteLog);
router.delete('/:id', deleteWasteLog);

export default router;