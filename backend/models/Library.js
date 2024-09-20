const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
