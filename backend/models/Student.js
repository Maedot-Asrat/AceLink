const mongoose = require('mongoose');

// Updated Student Schema with default availability
const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profile: {
    grade_level: { type: String },
    learning_style: { type: [String] },
    age: { type: Number },
    subject_interests: { type: [String] },
    availability: { 
      type: Map, 
      of: [String],
      default: { 
        "Tuesday": ["10:00-19:00", "9:00-19:00"], 
        "Saturday": ["12:00-18:00", "10:00-17:00"] 
      }
    },
    preferred_language: { type: String },
    goals: { type: String },
    current_needs: { type: String },
    profile_picture: { type: String }, // Added profile picture field
    parent_contact: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
    },
    feedback: [{
      tutor_id: { type: String },
      rating: { type: Number },
      comments: { type: String }
    }],
    study_habits: { type: String },
    extracurricular_activities: { type: [String] },
    health_considerations: { type: String },
    language_proficiency: { type: Map, of: String },
    gender_preference: { type: String, enum: ['No preference', 'Male', 'Female'] }
  }
});

module.exports = mongoose.model('Student', StudentSchema);
