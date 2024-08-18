// studyGroupModel.js
const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: [String], default: [] },
    subject: { type: String, required: true },
    meetingSchedule: { type: String, required: true },
    resources: { type: [String], default: [] },
    pendingRequests: { type: [String], default: [] },  // Add this field
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('StudyGroup', StudyGroupSchema);