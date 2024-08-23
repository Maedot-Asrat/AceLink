const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store encrypted passwords
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Student', 'Tutor'] },
});

module.exports = mongoose.model('User', UserSchema);

