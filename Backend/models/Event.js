import mongoose from 'mongoose';

const wasteRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ Required for population
  type: { type: String, enum: ['green', 'blue', 'black'], required: true },
  kg: { type: Number, required: true },
});


const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // ✅ Fixed here
  wasteType: String,
  volunteersNeeded: Number,
  volunteersJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: String, unique: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  wasteTreated: {
    totalKg: { type: Number, default: 0 },
    records: [wasteRecordSchema],
  },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
