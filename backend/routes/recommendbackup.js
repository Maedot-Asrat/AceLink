const express = require('express');
const axios = require('axios');
const router = express.Router();
const Student = require('../models/Student');  
const Tutor = require('../models/Tutor');      

// API endpoint for getting tutor recommendations
router.post('/recommend-tutor', async (req, res) => {
  try {
    // Extract studentId from request body
    const { studentId } = req.body;

    // Fetch student profile from the database
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Example student profile data (adjust as needed based on your schema)
    const studentProfile = student.profile[0];
    const { subject_interests, learning_style, availability } = studentProfile;

    // Fetch all tutor profiles from the database
    const tutors = await Tutor.find();

    // Filter tutors based on matching criteria (example: subject expertise and availability)
    const matchedTutors = tutors.filter(tutor => {
      const tutorProfile = tutor.profile[0];
      const { subject_expertise, availability: tutorAvailability } = tutorProfile;

      // Match tutor's subject expertise with student's interests
      const hasMatchingSubject = subject_expertise.some(subject => subject_interests.includes(subject));

      // Example logic to check availability matching (you can refine this further)
      const isAvailable = Array.from(availability.keys()).some(day => 
        tutorAvailability.has(day) && tutorAvailability.get(day).some(time => availability.get(day).includes(time))
      );

      return hasMatchingSubject && isAvailable;
    });

    // Construct the content for the recommendation API request including matched tutors
    const tutorDescriptions = matchedTutors.map(tutor => {
      const tutorProfile = tutor.profile[0];
      return `${tutor.username} teaches ${tutorProfile.subject_expertise.join(', ')} and is available ${Array.from(tutorProfile.availability.entries()).map(([day, times]) => `${day}: ${times.join(', ')}`).join('; ')}`;
    }).join('. ');

    const recommendationPrompt = `I have a student looking for a tutor. The student is interested in ${subject_interests.join(', ')}, prefers a ${learning_style} learning style, and is available during these times: ${Array.from(availability.entries()).map(([day, times]) => `${day}: ${times.join(', ')}`).join('; ')}. Here are some available tutors: ${tutorDescriptions}. Can you recommend a list of the best tutors for this student?`;

    // Make API request to the external recommendation service
    const response = await axios.post('https://api.afro.fit/api_v2/api_wrapper/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: recommendationPrompt }],
      max_tokens: 200,
      temperature: 0.7,
      response_format: 'text/plain',
      user_id: 'user123'
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'api_token': process.env.GENERATED_API_KEY // Ensure you have your API key set in environment variables
      }
    });

    // Assume the response contains a list of recommended tutors as text
    const tutorRecommendations = response.data;

    // Return the tutor recommendations and the matched tutors data back to the client
    res.json({ 
      recommendations: tutorRecommendations, 
      tutors: matchedTutors 
    });

  } catch (error) {
    console.error('Error fetching tutor recommendations:', error.message);
    if (error.response) {
      // Log detailed error response from the API
      console.error('Error response data:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
