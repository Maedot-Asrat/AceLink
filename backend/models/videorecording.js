const mongoose = require('mongoose');

const VideoRecordingSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number,
    createdAt: { type: Date, default: Date.now }
});

// Check if the model is already defined
const VideoRecording = mongoose.models.VideoRecording || mongoose.model('VideoRecording', VideoRecordingSchema);

module.exports = VideoRecording;
