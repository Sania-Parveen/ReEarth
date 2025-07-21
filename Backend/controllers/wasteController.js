// controllers/wasteController.js
import WasteLog from '../models/WasteLog.js';
import Event from '../models/Event.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// POST /api/waste/log
export const logWaste = async (req, res) => {
  try {
    const { userId, eventId, date, blueWasteKg, greenWasteKg, blackWasteKg } = req.body;

    const log = new WasteLog({ userId, eventId, date, blueWasteKg, greenWasteKg, blackWasteKg });
    await log.save();

    await Event.findByIdAndUpdate(eventId, { $push: { wasteLogs: log._id } });

    res.status(201).json({ message: 'Waste logged successfully', log });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log waste', details: err.message });
  }
};

// GET /api/waste/user/:userId
export const getUserWasteLogs = async (req, res) => {
  try {
    const logs = await WasteLog.find({ userId: req.params.userId }).populate('eventId');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
};

// GET /api/dashboard/summary/:userId
export const getUserDashboardSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const logs = await WasteLog.find({ userId });

    let summary = {
      totalEventsJoined: 0,
      totalBlueKg: 0,
      totalGreenKg: 0,
      totalBlackKg: 0,
      pieChart: { blue: 0, green: 0, black: 0 },
      dailyData: {}  // { '2025-07-20': { blue: 2, green: 1, black: 0 } }
    };

    const joinedEvents = await Event.find({ joinedUsers: userId });
    summary.totalEventsJoined = joinedEvents.length;

    logs.forEach(log => {
      const dateKey = log.date.toISOString().split('T')[0];

      summary.totalBlueKg += log.blueWasteKg;
      summary.totalGreenKg += log.greenWasteKg;
      summary.totalBlackKg += log.blackWasteKg;

      summary.dailyData[dateKey] = {
        blue: (summary.dailyData[dateKey]?.blue || 0) + log.blueWasteKg,
        green: (summary.dailyData[dateKey]?.green || 0) + log.greenWasteKg,
        black: (summary.dailyData[dateKey]?.black || 0) + log.blackWasteKg,
      };
    });

    summary.pieChart = {
      blue: summary.totalBlueKg,
      green: summary.totalGreenKg,
      black: summary.totalBlackKg,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Dashboard summary failed', details: err.message });
  }
};
// PUT /api/waste/:id
export const updateWasteLog = async (req, res) => {
  try {
    const { blueWasteKg, greenWasteKg, blackWasteKg } = req.body;

    const updatedLog = await WasteLog.findByIdAndUpdate(
      req.params.id,
      { blueWasteKg, greenWasteKg, blackWasteKg },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ error: 'Waste log not found' });
    }

    res.json({ message: 'Waste log updated', updatedLog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update log', details: err.message });
  }
};

// DELETE /api/waste/:id
export const deleteWasteLog = async (req, res) => {
  try {
    const wasteLog = await WasteLog.findByIdAndDelete(req.params.id);

    if (!wasteLog) {
      return res.status(404).json({ error: 'Waste log not found' });
    }

    // Remove reference from the event
    await Event.findByIdAndUpdate(wasteLog.eventId, {
      $pull: { wasteLogs: wasteLog._id }
    });

    res.json({ message: 'Waste log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete log', details: err.message });
  }
};
