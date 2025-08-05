// controllers/wasteController.js
import WasteLog from '../models/WasteLog.js';
import Event from '../models/Event.js';

import User from '../models/userModel.js';
import mongoose from 'mongoose';

// POST /api/waste/log
// controllers/wasteController.js
export const logWaste = async (req, res) => {
  try {
    const {
      userId,
      eventId,
      green = 0,
      blue = 0,
      black = 0,
    } = req.body;

    // Get current date in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istDate = new Date(now.getTime() + istOffset);

    const wasteLog = new WasteLog({
      userId,
      eventId,
      greenWasteKg: green,
      blueWasteKg: blue,
      blackWasteKg: black,
      date: istDate,
    });

    await wasteLog.save();

    // Update the event with the waste amounts
    await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: {
          'wasteTreated.green': green,
          'wasteTreated.blue': blue,
          'wasteTreated.black': black,
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: 'Waste logged and linked successfully',
      wasteLog,
    });
  } catch (error) {
    console.error('Error logging waste:', error);
    res.status(500).json({ error: 'Failed to log waste' });
  }
};




// GET /api/waste/user/:userId
// export const getUserWasteLogs = async (req, res) => {
//   try {
//     const logs = await WasteLog.find({ userId: req.params.userId }).populate('eventId');
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching logs' });
//   }
// };
// Get all waste logs for a user, including event info
export const getUserWasteLogs = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: 'wasteLogs',
      populate: {
        path: 'eventId', // 👈 populate event info
        model: 'Event'
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ wasteLogs: user.wasteLogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user waste logs', details: error.message });
  }
};


// GET /api/dashboard/summary/:userId
export const getDashboardSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const logs = await WasteLog.find({ userId }); // ✅ fix here

    let totalBlueKg = 0;
    let totalGreenKg = 0;
    let totalBlackKg = 0;
    const eventSet = new Set();
    const dailyData = {};

    logs.forEach((record) => {
      totalBlueKg += record.blueWasteKg || 0;
      totalGreenKg += record.greenWasteKg || 0;
      totalBlackKg += record.blackWasteKg || 0;

      if (record.eventId) {
        eventSet.add(record.eventId.toString());
      }

      const dateKey = record.date.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { blue: 0, green: 0, black: 0 };
      }

      dailyData[dateKey].blue += record.blueWasteKg || 0;
      dailyData[dateKey].green += record.greenWasteKg || 0;
      dailyData[dateKey].black += record.blackWasteKg || 0;
    });

    res.json({
      totalEventsJoined: eventSet.size,
      totalBlueKg,
      totalGreenKg,
      totalBlackKg,
      pieChart: {
        blue: totalBlueKg,
        green: totalGreenKg,
        black: totalBlackKg,
      },
      dailyData,
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ error: "Internal server error" });
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