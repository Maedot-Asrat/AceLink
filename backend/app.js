const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AudioRecording = require('./models/audiorecording'); // Adjust path to your AudioRecording model
const cors =require('cors');
// Import your routes
const userRoutes = require('./routes/user');
const studyGroupRoutes = require('./routes/sgRoutes');
const recommendRoutes = require('./routes/recommend');
const requestRoutes = require('./routes/requests');
const sessionRoutes = require('./routes/Sessions');
const courseRoutes = require('./routes/Courses');
const libraryRoutes = require('./routes/Library');
const ratingRoutes=require('./routes/Rating');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const Message = require('./models/Message'); 
const messageRoute = require('./routes/messageRoutes');
// Load environment variables
dotenv.config();



const app = express();
const server = http.createServer(app);



// Allow any origin without credentials
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: '*', // Allow any origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});


app.use(express.json());


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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const chatbotRoute = require('./routes/chatbot');
app.use('',chatbotRoute);

// Use your routes here
app.use('/user', userRoutes);
app.use('/group', studyGroupRoutes);
app.use('/api', recommendRoutes);
app.use('', requestRoutes);
app.use('/trust', sessionRoutes);
app.use('/courses', courseRoutes);
app.use('/library',libraryRoutes);
app.use('/rating',ratingRoutes);
app.use('/pass', authRoutes);
app.use('/pass', passwordRoutes);
app.use('/api', messageRoute);
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit all messages when a user connects
  socket.on('getMessages', async () => {
    const messages = await Message.find().populate('replies');
    socket.emit('loadMessages', messages);
  });

  // Handle new questions
  socket.on('chatMessage', async (msg) => {
    const newMessage = new Message(msg);
    const savedMessage = await newMessage.save();
    io.emit('newMessage', savedMessage); // Emit to all users
  });

  // Handle new replies
  socket.on('chatReply', async (reply) => {
    const newReply = new Message({ content: reply.content, sender: reply.sender });
    const savedReply = await newReply.save();
    await Message.findByIdAndUpdate(reply.parentMessageId, {
      $push: { replies: savedReply._id },
    });
    io.emit('newReply', { ...savedReply._doc, parentMessageId: reply.parentMessageId });
  });
});

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
        'language': 'en-US',
        'sentiment': true, // Enable sentiment analysis in the request
        'topics': true,
        'summarize': true
      }
    });

    console.log('Deepgram API Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.results && response.data.results.channels.length > 0) {
      const transcription = response.data.results.channels[0].alternatives[0].transcript;
      
      // Handle sentiment analysis results
      const sentimentAnalysis = response.data.results.channels[0].alternatives[0].sentiment;
      if (sentimentAnalysis) {
        console.log(`Sentiment analysis for ${recording.filename}:`, sentimentAnalysis);
        recording.sentiment = sentimentAnalysis;  // Save sentiment analysis
      } else {
        console.log(`No sentiment analysis available for ${recording.filename}.`);
      }

      // Handle topic analysis results
      const topics = response.data.results.channels[0].alternatives[0].topics;
      if (topics && topics.length > 0) {
        console.log(`Topics detected for ${recording.filename}:`, topics);
        recording.topics = topics;  // Save detected topics
      } else {
        console.log(`No topics detected for ${recording.filename}.`);
      }

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
