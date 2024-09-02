const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  jitsiLink: {
    type: String,
    required: true
  },
    title: {
      type: String,
      required: true,
    },
    sessionDateTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    recurrence: {
      type: String,
      default: 'none',
    },
    studentsInvolved: [{
      type: Schema.Types.ObjectId,
      ref: 'Student',
    }],
    notes: {
      type: String,
    },
    instructions: {
      type: String,
    },
    materialsUpload: {
      type: [String], // array of file URLs or paths
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
  }, {
    timestamps: true,
  });
  module.exports = mongoose.model('Session', sessionSchema);
