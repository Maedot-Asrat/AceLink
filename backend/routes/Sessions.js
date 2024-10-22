const express = require('express');
const router = express.Router();
const Session = require('../models/Sessions');
const multer = require('multer');
const AudioRecording = require('../models/audiorecording'); // Import AudioRecording model
const VideoRecording = require('../models/videorecording'); // Import VideoRecording model

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload audio and video files
router.post('/upload', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    if (!req.files || (!req.files.audio && !req.files.video)) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const audioFile = req.files.audio ? req.files.audio[0] : null;
    const videoFile = req.files.video ? req.files.video[0] : null;

    try {
        // Save audio recording if present
        if (audioFile) {
            const audioRecording = new AudioRecording({
                filename: audioFile.filename,
                filepath: audioFile.path,
                mimetype: audioFile.mimetype,
                size: audioFile.size,
            });
            await audioRecording.save();
        }

        // Save video recording if present
        if (videoFile) {
            const videoRecording = new VideoRecording({
                filename: videoFile.filename,
                filepath: videoFile.path,
                mimetype: videoFile.mimetype,
                size: videoFile.size,
            });
            await videoRecording.save();
        }

        res.status(200).json({ message: 'Files uploaded and saved successfully', files: req.files });
    } catch (error) {
        console.error('Error saving file details to database:', error);
        res.status(500).json({ error: 'Error saving file details to database' });
    }
});

// Get all recordings (both audio and video)
router.get('/recordings', async (req, res) => {
    try {
        const audioRecordings = await AudioRecording.find();
        const videoRecordings = await VideoRecording.find();
        res.status(200).json({ audioRecordings, videoRecordings });
    } catch (error) {
        console.error('Error fetching recordings:', error);
        res.status(500).json({ error: 'Error fetching recordings' });
    }
});

// Upload materials to a session
router.post('/sessions/:id/materials', upload.array('materials', 5), async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const materials = req.files.map(file => file.path);
        session.materialsUpload.push(...materials);

        await session.save();
        res.status(200).json(session);
    } catch (error) {
        console.error('Error uploading materials:', error);
        res.status(500).json({ error: 'Error uploading materials' });
    }
});

// Create a new session
router.post('/sessions', async (req, res) => {
    try {
        // Generate a unique Jitsi room name
        const jitsiRoomName = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create the Jitsi meeting link
        const jitsiLink = `https://8x8.vc/${jitsiRoomName}`; // Use 8x8.vc as the domain

        // Create a new session
        const session = new Session({
            ...req.body,
            createdBy: req.body.tutorId, // Assuming you're passing the tutor's ID as tutorId
            jitsiLink: jitsiLink // Add the Jitsi link to the session document
        });

        // Save the session
        await session.save();

       
        const students = session.studentsInvolved; // Assuming this is an array of student IDs
        students.forEach(studentId => {
            console.log(`Notifying student ${studentId.toString()}`);
            req.io.to(studentId.toString()).emit('sessionScheduled', {
                sessionId: session._id,
                message: 'A new session has been scheduled',
                sessionDetails: session,
                jitsiLink: session.jitsiLink
            });
        });
        

        // Respond with the created session
        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(400).json({ error: 'Error creating session' });
    }
});

// Get all sessions
router.get('/sessions', async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('studentsInvolved')
            .populate('createdBy'); // Populates the tutor details

        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Error fetching sessions' });
    }
});

// Get a specific session by ID
router.get('/sessions/:id', async (req, res) => {
    const sessionId = req.params.id;
    try {
        const session = await Session.findById(sessionId)
            .populate('studentsInvolved')
            .populate('createdBy'); // Populates the tutor details

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.status(200).json(session);
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ error: 'Error fetching session' });
    }
});

// Update a session
router.patch('/sessions/:id', async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.status(200).json(session);
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(400).json({ error: 'Error updating session' });
    }
});

// Delete a session
router.delete('/sessions/:id', async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted successfully', session });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ error: 'Error deleting session' });
    }
});
router.get('/sessions/student/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
  
      // Find sessions where the student is involved
      const sessions = await Session.find({ studentsInvolved: studentId }).populate('createdBy', 'name');
  
      if (sessions.length === 0) {
        return res.status(404).json({ message: 'No sessions found for this student.' });
      }
  
      res.status(200).json(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ message: 'Failed to fetch sessions' });
    }
  });

  // Get all sessions created by a specific tutor
router.get('/sessions/tutor/:tutorId', async (req, res) => {
    try {
        const { tutorId } = req.params;

        // Find sessions created by the specified tutor
        const sessions = await Session.find({ createdBy: tutorId }).populate('studentsInvolved', 'name');

        if (sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this tutor.' });
        }

        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions for tutor:', error);
        res.status(500).json({ message: 'Failed to fetch sessions' });
    }
});



module.exports = router;
