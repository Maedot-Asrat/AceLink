import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Button, CircularProgress } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from 'axios';
import FlashcardItem from '../recordings/RecordingsPage'; // Import the flashcard component
import '../dashboard/dashboard.css';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const studentId = localStorage.getItem('studentId');

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/trust/sessions/student/${studentId}`);
      setSessions(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(''); // Just an empty string to trigger the "No sessions" UI
    }
  };

  const fetchRecordings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/trust/recordings`);
      const recordingsWithFlashcards = response.data.audioRecordings.filter(
        (audio) => audio.flashcards
      );
      setFlashcards(recordingsWithFlashcards);
    } catch (err) {
      setError('Failed to load flashcards.');
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchSessions();
      fetchRecordings();
    } else {
      setError('No student ID found.');
      setLoading(false);
    }
  }, [studentId]);

  const renderSessionsSummary = (meetingList) => {
    return meetingList.slice(0, 3).map((meeting) => (
      <Paper
        elevation={4}
        key={meeting._id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          mb: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            backgroundColor: '#e3f2fd',
            borderRadius: 2,
          }}
        >
          <VideoCameraFrontIcon sx={{ fontSize: 25, color: '#166A9E' }} />
        </Box>
        <Box sx={{ flexGrow: 1, pl: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#004080' }}>
            {meeting.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            by {meeting.createdBy?.name || 'Unknown'}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#555' }}>
            {new Date(meeting.sessionDateTime).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {new Date(meeting.sessionDateTime).toLocaleTimeString()}
          </Typography>
        </Box>
      </Paper>
    ));
  };

  const renderNoSessionsUI = () => (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#555' }}>
        No upcoming sessions found.
      </Typography>
      <EventNoteIcon sx={{ fontSize: 80, color: '#166A9E', mb: 3 }} />
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        It looks like you don't have any upcoming sessions. Check back later or schedule a new session!
      </Typography>
      <Button
        variant="contained"
        href="/tutors"
        sx={{ backgroundColor: '#166A9E', textTransform: 'none', color: '#fff' }}
      >
        Find Tutors
      </Button>
    </Box>
  );

  if (loading) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading sessions...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#004080' }}>
          Next Sessions
        </Typography>
        {sessions.length > 0
          ? renderSessionsSummary(
              sessions.filter((meeting) => new Date(meeting.sessionDateTime).toISOString().split('T')[0] >= today)
            )
          : renderNoSessionsUI()}
      </Box>
      {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          href="/myschedules"
          sx={{ backgroundColor: '#166A9E', textTransform: 'none', color: '#fff' }}
        >
          View All Sessions
        </Button>
      </Box> */}

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#004080' }}>
          Practice
        </Typography>
        {flashcards.map((audio) => (
          <FlashcardItem key={audio._id} flashcards={audio.flashcards} />
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
