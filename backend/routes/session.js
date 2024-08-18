const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Tutor = require('../models/Tutor');
const Student = require('../models/Student'); // Ensure you have a Student model

// Endpoint for tutors to schedule a session with students
router.post('/schedule-session', async (req, res) => {
  try {
    const { tutorId, roomName, meetingTime, studentIds } = req.body;

    // Check if the tutor exists
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }

    // Validate that the students exist
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res.status(404).json({ error: 'One or more students not found' });
    }

    // Create a new session
    const session = new Session({
      tutor: tutorId,
      students: studentIds, // Add students involved in the session
      roomName,
      meetingTime: new Date(meetingTime) // Convert to Date object
    });

    await session.save();

    res.status(201).json({ message: 'Session scheduled successfully', session });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scheduling the session', details: error.message });
  }
});

// Endpoint to update a session
router.put('/update-session/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { roomName, meetingTime, studentIds } = req.body;
  
      // Validate that the students exist if studentIds are provided
      if (studentIds) {
        const students = await Student.find({ _id: { $in: studentIds } });
        if (students.length !== studentIds.length) {
          return res.status(404).json({ error: 'One or more students not found' });
        }
      }
  
      // Find the session by ID and update it
      const session = await Session.findByIdAndUpdate(
        id,
        {
          roomName,
          meetingTime: meetingTime ? new Date(meetingTime) : undefined,
          students: studentIds || undefined
        },
        { new: true, runValidators: true }
      );
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      res.status(200).json({ message: 'Session updated successfully', session });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the session', details: error.message });
    }
  });
// Endpoint to delete a session
router.delete('/delete-session/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the session by ID and delete it
      const session = await Session.findByIdAndDelete(id);
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the session', details: error.message });
    }
  });
    

module.exports = router;