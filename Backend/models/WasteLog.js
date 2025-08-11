// models/WasteLog.js
import mongoose from 'mongoose';

const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  blueWasteKg: { type: Number, default: 0 },
  greenWasteKg: { type: Number, default: 0 },
  blackWasteKg: { type: Number, default: 0 },
   date: { type: Date, default: Date.now } 
}, { timestamps: true });

export default mongoose.model('WasteLog', wasteLogSchema);
