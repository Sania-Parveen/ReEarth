import mongoose from 'mongoose';

const wasteRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blackKg: { type: Number, default: 0 },
  greenKg: { type: Number, default: 0 },
  blueKg: { type: Number, default: 0 },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  wasteType: String,
  volunteersNeeded: Number,
  volunteersJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: String, unique: true },
  wasteTreated: {
    totalKg: { type: Number, default: 0 },
    records: [wasteRecordSchema],
  },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);

