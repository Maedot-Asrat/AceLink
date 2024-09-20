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
router.post('/', upload.single('picture'), async (req, res) => {
    try {
        // Create the new study group
        const studyGroup = new StudyGroup({
            ...req.body,
            owner: req.body.owner  // Ensure owner is passed in the request body
        });

        // If a picture is uploaded, store its path in the study group
        if (req.file) {
            studyGroup.picture = req.file.path;
        }

        // Save the new study group to the database
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

// Get previous chats for a group
router.get('/:id/previous-chats', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.json({ chats: studyGroup.previousChats || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get files of a group
router.get('/:id/files', async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (studyGroup == null) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.json({ files: studyGroup.resources || [] });
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

// Get groups created by the owner
router.get('/owner/:userId', async (req, res) => {
    try {
        const studyGroups = await StudyGroup.find({ owner: req.params.userId });
        res.json(studyGroups);
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

// Get join requests for groups created by the user (group owner)
router.get('/requests/:userId', async (req, res) => {
    try {
        const studyGroups = await StudyGroup.find({ owner: req.params.userId });
        const requests = studyGroups.map(group => ({
            groupId: group._id,
            title: group.title,
            pendingRequests: group.pendingRequests
        }));
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get study groups the user has joined
router.get('/member/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const userGroups = await StudyGroup.find({ members: userId });
      res.status(200).json(userGroups);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific group the user has joined and open the chat page
router.get('/member/:userId/:groupId', async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        const studyGroup = await StudyGroup.findOne({ _id: groupId, members: userId });
        if (!studyGroup) {
            return res.status(404).json({ message: 'Study group not found or user is not a member' });
        }
        res.status(200).json(studyGroup);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a message to the study group chat
router.post('/:id/chat', async (req, res) => {
    const { message, userId } = req.body;
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (!studyGroup) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        // Add the message to the group's chat array
        studyGroup.chat.push({ userId, message, timestamp: new Date() });
        await studyGroup.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload a file to a study group
router.post('/:id/files', upload.single('file'), async (req, res) => {
    try {
        const studyGroup = await StudyGroup.findById(req.params.id);
        if (!studyGroup) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        // Store the file path in the study group's resources field
        studyGroup.resources.push({ fileName: req.file.originalname, filePath: req.file.path });
        await studyGroup.save();

        res.status(201).json({ message: 'File uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
