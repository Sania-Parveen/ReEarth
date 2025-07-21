// models/WasteLog.js
import mongoose from 'mongoose';

const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  date: { type: Date, required: true },
  blueWasteKg: { type: Number, default: 0 },
  greenWasteKg: { type: Number, default: 0 },
  blackWasteKg: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('WasteLog', wasteLogSchema);
