const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Added students field
  roomName: { type: String, required: true },
  meetingTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);