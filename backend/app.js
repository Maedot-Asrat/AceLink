const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const fs = require('fs');
const AudioRecording = require('./models/audiorecording'); // Adjust path to your AudioRecording model
const path = require('path');

// Import your routes
const userRoutes = require('./routes/user');
const studyGroupRoutes = require('./routes/sgRoutes');
const recommendRoutes = require('./routes/recommend');
const requestRoutes = require('./routes/requests');
const sessionRoutes = require('./routes/Sessions');
const courseRoutes = require('./routes/Courses');
const chatbotRoute = require('./routes/chatbot');
const messageRoute = require('./routes/messageRoutes');
const cors = require('cors');
const router = require('./routes/user');
// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://acelink-tutoring.netlify.app', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
    credentials: true, // Allow credentials like cookies
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    processRecordings(); // Start transcription and summarization process after MongoDB is connected
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to attach Socket.IO to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Use your routes here
app.use('/user', userRoutes);
app.use('', studyGroupRoutes);
app.use('/api', recommendRoutes);
app.use('', requestRoutes);
app.use('/trust', sessionRoutes);
app.use('/courses', courseRoutes);
app.use('',chatbotRoute);
app.use('/api', messageRoute(io));

// Summarization Function using Gemini
async function summarizeTranscription(transcription) {
  if (!transcription || transcription.trim() === '') {
    console.log('Empty or invalid transcription received.');
    return null;
  }

  try {
    const prompt = `This is a transcription from a tutoring session. Please summarize the key points and important information discussed in the session:\n\n${transcription}`;

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
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const summary = response.data.candidates[0].content.parts.map(part => part.text).join(" ");
      return summary;
    } else {
      console.log('No summary generated from the response.');
      return null;
    }
  } catch (error) {
    console.error('Error during summarization:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Process Recordings: Fetch, Transcribe (if needed), Summarize, and Save
// Flashcard Generation Function using Gemini
async function generateFlashcards(summary) {
  if (!summary || summary.trim() === '') {
    console.log('Empty or invalid summary received.');
    return null;
  }

  try {
    const prompt = `Here is a summary of a tutoring session. Create flashcards with a question and answer format from the key points discussed in this summary:\n\n${summary}`;

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
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const flashcards = response.data.candidates[0].content.parts.map(part => part.text).join("\n");
      return flashcards;
    } else {
      console.log('No flashcards generated from the response.');
      return null;
    }
  } catch (error) {
    console.error('Error during flashcard generation:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Quiz Generation Function using Gemini
async function generateQuizzes(summary) {
  if (!summary || summary.trim() === '') {
    console.log('Empty or invalid summary received.');
    return null;
  }

  try {
    const prompt = `Here is a summary of a tutoring session. Create a set of quizzes with a question and answer format from the key points discussed in this summary:\n\n${summary}`;

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
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const quizzes = response.data.candidates[0].content.parts.map(part => part.text).join("\n");
      return quizzes;
    } else {
      console.log('No quizzes generated from the response.');
      return null;
    }
  } catch (error) {
    console.error('Error during quiz generation:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Review Notes Generation Function using Gemini
async function generateReviewNotes(summary) {
  if (!summary || summary.trim() === '') {
    console.log('Empty or invalid summary received.');
    return null;
  }

  try {
    const prompt = `Here is a summary of a tutoring session. Create a concise review note that highlights the key takeaways and important concepts discussed in this summary:\n\n${summary}`;

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
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const reviewNotes = response.data.candidates[0].content.parts.map(part => part.text).join("\n");
      return reviewNotes;
    } else {
      console.log('No review notes generated from the response.');
      return null;
    }
  } catch (error) {
    console.error('Error during review notes generation:', error.response ? error.response.data : error.message);
    return null;
  }
}


// Process Recordings: Generate Flashcards after Summarization
async function processRecordings() {
  try {
    const recordings = await AudioRecording.find({});
    if (!recordings || recordings.length === 0) {
      console.log('No recordings found in the database.');
      return;
    }

    for (const recording of recordings) {
      try {
        if (!recording.transcription) {
          console.log(`Transcribing recording: ${recording.filename}`);
          await transcribeAndSave(recording);
        }

        if (!recording.summary && recording.transcription) {
          console.log(`Summarizing transcription for recording: ${recording.filename}`);
          const summary = await summarizeTranscription(recording.transcription);
          if (summary) {
            recording.summary = summary;
            await recording.save();
            console.log(`Summary saved for ${recording.filename}.`);
          } else {
            console.log(`No summary generated for ${recording.filename}.`);
          }
        }

        if (recording.summary && !recording.flashcards) {
          console.log(`Generating flashcards for recording: ${recording.filename}`);
          const flashcards = await generateFlashcards(recording.summary);
          if (flashcards) {
            recording.flashcards = flashcards;
            await recording.save();
            console.log(`Flashcards saved for ${recording.filename}.`);
          } else {
            console.log(`No flashcards generated for ${recording.filename}.`);
          }
        }

        if (recording.summary && !recording.quizzes) {
          console.log(`Generating quizzes for recording: ${recording.filename}`);
          const quizzes = await generateQuizzes(recording.summary);
          if (quizzes) {
            recording.quizzes = quizzes;
            await recording.save();
            console.log(`Quizzes saved for ${recording.filename}.`);
          } else {
            console.log(`No quizzes generated for ${recording.filename}.`);
          }
        }

        if (recording.summary && !recording.reviewNotes) {
          console.log(`Generating review notes for recording: ${recording.filename}`);
          const reviewNotes = await generateReviewNotes(recording.summary);
          if (reviewNotes) {
            recording.reviewNotes = reviewNotes;
            await recording.save();
            console.log(`Review notes saved for ${recording.filename}.`);
          } else {
            console.log(`No review notes generated for ${recording.filename}.`);
          }
        }
      } catch (recordingError) {
        console.error(`Error processing recording ${recording.filename}:`, recordingError);
      }
    }
  } catch (error) {
    console.error('Error fetching recordings from database:', error);
  }
}


// Transcription and Saving Function
async function transcribeAndSave(recording) {
  try {
    if (!fs.existsSync(recording.filepath)) {
      console.error(`File not found: ${recording.filepath}`);
      return;
    }

    const audioData = fs.readFileSync(recording.filepath);

    const response = await axios.post('https://api.deepgram.com/v1/listen', audioData, {
      headers: {
        'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/webm' // Adjust if using a different audio format
      },
      params: {
        'punctuate': true,
        'language': 'en-US'
      }
    });

    if (response.data && response.data.results && response.data.results.channels.length > 0) {
      const transcription = response.data.results.channels[0].alternatives[0].transcript;
      console.error('Deepgram API Error Response:', response.data);

      if (!transcription || transcription.trim() === '') {
        console.error(`Transcription failed or empty for ${recording.filename}.`);
        return;
      }

      recording.transcription = transcription;
      await recording.save();
      console.log(`Transcription saved for ${recording.filename}.`);

      const summary = await summarizeTranscription(transcription);
      if (summary) {
        recording.summary = summary;
        await recording.save();
        console.log(`Summary saved for ${recording.filename}.`);
      } else {
        console.error(`Failed to generate summary for ${recording.filename}.`);
      }
    } else {
      console.error('Unexpected API response structure:', response.data);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Deepgram API Error:`, error.response.data);
    } else {
      console.error(`Error during transcription for ${recording.filename}:`, error.message);
    }
  }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
