const mongoose = require('mongoose');

// Independent Tutor Schema
const TutorSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // No `required: true`
  email: { type: String, unique: true },    // No `required: true`
  profile: [
    {
      subject_expertise: { type: [String] },  // No `required: true`
      grade_levels: { type: [String] },       // No `required: true`
      teaching_style: { type: String },       // No `required: true`
      availability: { type: Map, of: [String] },
      languages_spoken: { type: [String] },   // No `required: true`
      rating: { type: Number },
      experience: { type: Number },           // No `required: true`
      qualifications: { type: String },
      profile_picture: { type: String },        // No `required: true`
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
  ],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

module.exports = mongoose.model('Tutor', TutorSchema);
