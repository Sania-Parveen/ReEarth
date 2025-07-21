// routes/wasteRoutes.js
import express from 'express';
import {
  logWaste,
  getUserWasteLogs,
  getUserDashboardSummary,
  updateWasteLog,
  deleteWasteLog
} from '../controllers/wasteController.js';

const router = express.Router();

router.post('/log', logWaste);
router.get('/user/:userId', getUserWasteLogs);
router.get('/dashboard/summary/:userId', getUserDashboardSummary);
router.put('/:id', updateWasteLog);
router.delete('/:id', deleteWasteLog);

export default router;
