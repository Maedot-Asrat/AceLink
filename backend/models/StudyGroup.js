const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String },
    members: { type: [String], default: [] },
    subject: { type: String, required: true },
    meetingSchedule: { type: String, required: true },
    resources: { type: [String], default: [] },
    pendingRequests: { type: [String], default: [] },  
    chat: [
        {
            userId: String,
            message: String,
            timestamp: { type: Date, default: Date.now }
        }
    ], // Add this field for chats
    createdAt: { type: Date, default: Date.now },
    owner: { type: String, required: true }, 
});

module.exports = mongoose.model('StudyGroup', StudyGroupSchema);
