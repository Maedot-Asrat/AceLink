const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },  // Add password if needed
  learningGoals: { type: String, required: true },
  currentLevel: { type: String, required: true },
  preferredTutorAttributes: {
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
  },
});

const tutorSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },  // Add password if needed
  subjects: { type: [String], required: true }, // Add required if necessary
  availability: { type: [String], required: true }, // Add required if necessary
  rating: { type: Number, default: 0 },
  experience: { type: Number, required: true },
  qualifications: { type: [String], required: true }, // Add required if necessary
});

// Models
const Student = mongoose.model('Student', studentSchema);
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = { Student, Tutor };
