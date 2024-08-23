const mongoose = require('mongoose');

// Request Schema
const RequestSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  tutor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
