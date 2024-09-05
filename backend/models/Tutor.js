const mongoose = require('mongoose');

// Independent Tutor Schema
const TutorSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // No `required: true`
  email: { type: String, unique: true },    // No `required: true`
  profile: 
    {
      subject_expertise: { type: [String] }, 
      fee: { type: [Number] },
      grade_levels: { type: [String] },
      teaching_style: { type: String },
      availability: { type: Map, of: [String] },
      languages_spoken: { type: [String] },
      experience: { type: Number },
      qualifications: { type: String },
      profile_picture: { type: String },
      specialization_areas: { type: [String] },
      certifications: { type: [String] },
      performance_metrics: {
        average_improvement: { type: String },
        student_retention: { type: String }
      },
      availability_time_zone: { type: String },
      tutoring_approach: { type: String },
      past_student_outcomes: [{
        student_id: { type: String },
        improvement: { type: String }
      }],
      professional_development: { type: String },
      personal_interests: { type: [String] }
    }
  ,
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],

  // Add ratings at the top level
  ratings: [
    {
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      score: { type: Number, required: true, min: 1, max: 5 }, // Rating score between 1 and 5
      comment: { type: String },  // Optional comment
      date: { type: Date, default: Date.now }
    }
  ],
  average_rating: { type: Number, default: 0 }  // Average rating of the tutor
});

module.exports = mongoose.model('Tutor', TutorSchema);
