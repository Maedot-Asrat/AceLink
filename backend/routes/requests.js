const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const mongoose = require('mongoose');


router.post('/request', async (req, res) => {
  const { student_id, tutor_id, message,student_name } = req.body;

  if (!student_id) {
    console.log('Validation failed: student_id is required');
    return res.status(400).json({ error: 'Missing required field: student_id' });
  }
  if (!tutor_id) {
    console.log('Validation failed: tutor_id is required');
    return res.status(400).json({ error: 'Missing required field: tutor_id' });
  }
  if (!message) {
    console.log('Validation failed: message is required');
    return res.status(400).json({ error: 'Missing required field: message' });
  }

  // Step 2: Validate the ObjectId format (to ensure it's a valid MongoDB ObjectId)
  if (!mongoose.Types.ObjectId.isValid(student_id) || !mongoose.Types.ObjectId.isValid(tutor_id)) {
    console.log('Validation failed: Invalid student_id or tutor_id format');
    return res.status(400).json({ error: 'Invalid student_id or tutor_id format' });
  }

  try {
    console.log('Fetching student and tutor from the database...');

    // Step 3: Validate that the student and tutor exist
    const student = await Student.findById(student_id);
    const tutor = await Tutor.findById(tutor_id);

    if (!student) {
      console.log('Error: Student not found');
      return res.status(404).json({ error: 'Student not found' });
    }
    
    if (!tutor) {
      console.log('Error: Tutor not found');
      return res.status(404).json({ error: 'Tutor not found' });
    }

    // Step 4: Create a new request
    console.log('Creating new request...');
    const newRequest = new Request({
      student_id,
      student_name,
      tutor_id,
      message,
      status: 'Pending' // Default status when creating a new request
    });

    // Step 5: Save the request in the database
    await newRequest.save();

    // Step 6: Update the tutor's profile to include the request
    tutor.requests.push(newRequest._id);
    await tutor.save();

    // Step 7: Respond with success
    console.log('Request sent successfully');
    return res.status(201).json({ message: 'Request sent successfully', request: newRequest });

  } catch (err) {
    // Step 8: Catch any unexpected errors and log them for debugging
    console.error('Error during request creation:', err);  // Add detailed logging here

    // Handle different types of errors
    if (err instanceof mongoose.Error.ValidationError) {
      // Database validation errors
      return res.status(400).json({ error: 'Invalid data', details: err.message });
    } else if (err instanceof mongoose.Error.CastError) {
      // Database cast errors (e.g., invalid ObjectId format)
      return res.status(400).json({ error: 'Invalid student_id or tutor_id format' });
    } else {
      // Catch-all for other types of errors
      return res.status(500).json({ error: 'An internal server error occurred' });
    }
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
