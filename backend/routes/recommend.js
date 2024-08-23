const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const axios = require('axios');

// GPT Access Token
const chatgptToken = '';

router.post('/tutor', async (req, res) => {
  try {
    const { studentId } = req.body;
    console.log('Received request for studentId:', studentId);

    // Fetch the student's profile from the database
    const student = await Student.findById(studentId);
    if (!student) {
      console.error('Student not found with ID:', studentId);
      return res.status(404).json({ error: 'Student not found' });
    }
    console.log('Fetched student profile:', student);

    const studentProfile = student.profile[0];
    console.log('Extracted student profile:', studentProfile);

    const { grade_level, subject_interests, preferred_language } = studentProfile;

    // Query the Tutor collection to find all tutors
    const tutors = await Tutor.find({});
    if (tutors.length === 0) {
      console.error('No tutors found in the database');
      return res.status(404).json({ message: 'No tutors found in the database' });
    }
    console.log('Fetched tutors:', tutors);

    // Prepare data for ChatGPT
    const chatgptData = {
      studentProfile: studentProfile,
      tutors: tutors.map(tutor => ({
        id: tutor._id,
        username: tutor.username,
        subject_expertise: tutor.profile[0].subject_expertise,
        grade_levels: tutor.profile[0].grade_levels,
        teaching_style: tutor.profile[0].teaching_style,
        availability: tutor.profile[0].availability,
        languages_spoken: tutor.profile[0].languages_spoken,
        qualifications: tutor.profile[0].qualifications,
      }))
    };

    console.log('Prepared data for ChatGPT:', chatgptData);

    // Use ChatGPT to refine the tutor recommendations
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an assistant that helps match students with the best tutors based on their profiles.'
          },
          {
            role: 'user',
            content: `Given this student's profile: ${JSON.stringify(studentProfile)}, recommend the tutors from the following list: ${JSON.stringify(chatgptData.tutors)}.`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${chatgptToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the status and response from ChatGPT
    console.log('ChatGPT response status:', response.status);
    console.log('ChatGPT full response:', response.data);

    // Extract recommended tutors
    const recommendedTutors = response.data.choices[0].message.content;
    console.log('Recommended tutors:', recommendedTutors);

    // Send the refined recommendations back to the client
    res.status(200).json({ recommendations: recommendedTutors });

  } catch (err) {
    console.error('Error occurred:', err.message || err);
    console.log('Full error details:', err);

    // Send a detailed error response
    res.status(500).json({
      error: 'Server error',
      details: err.message,
      stack: err.stack,
      config: err.config ? {
        url: err.config.url,
        method: err.config.method,
        headers: err.config.headers,
        data: err.config.data
      } : null
    });
  }
});

module.exports = router;
