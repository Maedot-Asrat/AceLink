const axios = require('axios');
const fs = require('fs');

const deepgramApiKey = '501de8c80a9fdfbdbb324fdcc1a9ec1c8499d235';
const geminiApiKey = 'AIzaSyCv4qsFLhsitFnHQjd0C79rHXbfmblct8Q';
const audioFilePath = 'rec.mp4';

async function transcribeAudio() {
  try {
    const audioData = fs.readFileSync(audioFilePath);

    const response = await axios.post('https://api.deepgram.com/v1/listen', audioData, {
      headers: {
        'Authorization': `Token ${deepgramApiKey}`,
        'Content-Type': 'audio/mp4'
      },
      params: {
        'punctuate': true,
        'language': 'en-US'
      }
    });

    const transcription = response.data.results.channels[0].alternatives[0].transcript;
    
    console.log('Transcription result:', transcription);
    
    await summarizeTranscription(transcription);

  } catch (error) {
    console.error('Error during transcription:', error.response ? error.response.data : error.message);
  }
}

async function summarizeTranscription(transcription) {
  try {
    const prompt = `This is a transcription from a tutoring session. Please summarize the key points and important information discussed in the session:\n\n${transcription}`;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
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

    const candidates = response.data.candidates;
    if (candidates && candidates.length > 0) {
      const summary = candidates[0].content;
      console.log('Summary result:', summary);
    } else {
      console.log('No summary generated');
    }
  } catch (error) {
    console.error('Error during summarization:', error.response ? error.response.data : error.message);
  }
}

transcribeAudio();
