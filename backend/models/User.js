const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store encrypted passwords
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Student', 'Tutor'] },
  resetPasswordToken: { type: String },  // Token for password reset
  resetPasswordExpires: { type: Date }   // Expiry time for the token
});

module.exports = mongoose.model('User', UserSchema);
