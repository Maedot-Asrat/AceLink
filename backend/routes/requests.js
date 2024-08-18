const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');

// Endpoint for Student to send a request
router.post('/request', async (req, res) => {
  const { student_id, tutor_id, message } = req.body;

  try {
    // Validate that the student and tutor exist
    const student = await Student.findById(student_id);
    const tutor = await Tutor.findById(tutor_id);

    if (!student || !tutor) {
      return res.status(404).json({ error: 'Student or Tutor not found' });
    }

    // Create a new request
    const newRequest = new Request({
      student_id,
      tutor_id,
      message,
      status: 'Pending' // Default status when creating a new request
    });

    // Save the request
    await newRequest.save();

    // Update the tutor's profile to include the request
    tutor.requests.push(newRequest._id);
    await tutor.save();

    res.status(201).json({ message: 'Request sent successfully', request: newRequest });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while sending the request' });
  }
});

// Endpoint for Tutor to approve/reject a request
router.patch('/request/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be "Approved" or "Rejected".' });
  }

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Update the status of the request
    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully`, request });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the request' });
  }
});

// Endpoint to fetch all requests for a specific tutor
router.get('/tutor/:tutor_id/requests', async (req, res) => {
  const { tutor_id } = req.params;

  try {
    const tutor = await Tutor.findById(tutor_id).populate('requests');
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }

    res.status(200).json({ requests: tutor.requests });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the requests' });
  }
});

// Endpoint to fetch all requests for a specific student
router.get('/student/:student_id/requests', async (req, res) => {
  const { student_id } = req.params;

  try {
    const requests = await Request.find({ student_id });
    if (requests.length === 0) {
      return res.status(404).json({ message: 'No requests found for this student' });
    }

    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the requests' });
  }
});

module.exports = router;