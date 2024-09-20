const mongoose = require('mongoose');

// Define the schema for AudioRecording
const AudioRecordingSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
    transcription: { type: String, default: null },
    summary: { type: String, default: null },
    flashcards: { type: String, default: null },
    quizzes: { type: String, default: null },
    reviewNotes: { type: String, default: null },
    sentiment: { type: mongoose.Schema.Types.Mixed, default: null },  // Field for sentiment analysis
    topics: { type: [String], default: [] }  // Field for detected topics
});

// Check if the model is already defined
const AudioRecording = mongoose.models.AudioRecording || mongoose.model('AudioRecording', AudioRecordingSchema);

module.exports = AudioRecording;


