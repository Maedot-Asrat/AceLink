// studyGroupRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const StudyGroup = require('../models/StudyGroup');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file names
    }
});

const upload = multer({ storage: storage });

// Create a new study group
router.post('/', async (req, res) => {
    try {
        const studyGroup = new StudyGroup(req.body);
        const savedStudyGroup = await studyGroup.save();
        res.status(201).json(savedStudyGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all study groups
router.get('/', async (req, res) => {
    try {
        const studyGroups = await StudyGroup.find();
        res.json(studyGroups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific study group by ID
router.get('/:id', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.json(studyGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a study group by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedStudyGroup = await StudyGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedStudyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.json(updatedStudyGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a study group by ID
router.delete('/:id', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findByIdAndDelete(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.json({ message: 'Study group deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload a file to a study group
router.post('/:id/files', upload.single('file'), async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        
        // You can store the file path in the study group document
        studyGroup.resources.push(req.file.path);
        await studyGroup.save();

        res.status(201).json({ message: 'File uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Request to join a study group
router.post('/:id/request', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        if (studyGroup.members.includes(req.body.userId)) {
            return res.status(400).json({ message: 'User is already a member of the group' });
        }

        if (!studyGroup.pendingRequests.includes(req.body.userId)) {
            studyGroup.pendingRequests.push(req.body.userId);
            await studyGroup.save();
            return res.status(201).json({ message: 'Request to join study group sent' });
        } else {
            return res.status(400).json({ message: 'Request already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept a join request
router.post('/:id/accept', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        const requestIndex = studyGroup.pendingRequests.indexOf(req.body.userId);
        if (requestIndex !== -1) {
            // Add to members and remove from pending requests
            studyGroup.members.push(req.body.userId);
            studyGroup.pendingRequests.splice(requestIndex, 1);
            await studyGroup.save();

            return res.status(200).json({ message: 'User added to the study group' });
        } else {
            return res.status(400).json({ message: 'No such request exists' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Reject a join request
router.post('/:id/reject', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        const requestIndex = studyGroup.pendingRequests.indexOf(req.body.userId);
        if (requestIndex !== -1) {
            // Remove from pending requests
            studyGroup.pendingRequests.splice(requestIndex, 1);
            await studyGroup.save();

            return res.status(200).json({ message: 'Request rejected' });
        } else {
            return res.status(400).json({ message: 'No such request exists' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
