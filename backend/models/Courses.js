// models/Course.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,  // URL of the video
        required: true
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor',  // Reference to Tutor model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', CourseSchema);
