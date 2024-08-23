const mongoose = require('mongoose');

// Define the schema for AudioRecording
const AudioRecordingSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
    transcription: { type: String, default: null }, // Field for transcription
    summary: { type: String, default: null }, // Field for summary
    flashcards: { type: String, default: null }, // Field for flashcards
    quizzes: { type: String, default: null }, // Field for quizzes
    reviewNotes: { type: String, default: null }, // Field for review notes
});

// Check if the model is already defined
const AudioRecording = mongoose.models.AudioRecording || mongoose.model('AudioRecording', AudioRecordingSchema);

module.exports = AudioRecording;


