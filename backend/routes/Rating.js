const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const Student = require('../models/Student');

// Route to rate a tutor
router.post('/rate-tutor', async (req, res) => {
  try {
    const { studentId, tutorId, score, comment } = req.body;

    // Validate score
    if (score < 1 || score > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Find the tutor by ID
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Add the rating
    tutor.ratings.push({
      student_id: studentId,
      score,
      comment
    });

    // Calculate the new average rating
    const totalRatings = tutor.ratings.length;
    const totalScore = tutor.ratings.reduce((acc, rating) => acc + rating.score, 0);
    tutor.average_rating = totalScore / totalRatings;

    // Save the updated tutor
    await tutor.save();

    res.status(200).json({
      message: 'Rating submitted successfully',
      tutor: {
        average_rating: tutor.average_rating,
        ratings: tutor.ratings
      }
    });
  } catch (err) {
    console.error('Error submitting rating:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
