const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true }, // Fetch sender ID from local storage on the frontend
  hashtags: [{ type: String }], // Accepts multiple hashtags
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // References other messages as replies
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
