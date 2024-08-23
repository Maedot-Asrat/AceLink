const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const prompt = `This is a conversation with a tutoring chatbot. Please respond to the following user message:\n\n"${userMessage}"`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the full content structure to see what exactly is inside
    console.log('Candidate Content:', response.data.candidates[0].content);

    // Try accessing the content in different ways depending on its structure
    const content = response.data.candidates[0]?.content;
    const chatbotReply = content.text || content.parts?.[0]?.text || "No response generated";

    res.json({ reply: chatbotReply });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot' });
  }
});

module.exports = router;
