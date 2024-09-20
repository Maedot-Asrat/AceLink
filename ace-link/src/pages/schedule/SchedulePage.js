import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Button, CircularProgress } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from 'axios';

const SchedulePage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Get studentId from localStorage
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Fetch sessions for the logged-in student using the new route
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trust/sessions/student/${studentId}`);
        setSessions(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No sessions found for this student.');
        } else {
          setError('Failed to load sessions. Please try again later.');
        }
        setLoading(false);
      }
    };

    if (studentId) {
      fetchSessions();
    } else {
      setError('No student ID found.');
      setLoading(false);
    }
  }, [studentId]);

  const filterMeetings = (condition) => sessions.filter(condition);

  const renderMeetings = (meetingList, emptyMessage) => {
    if (meetingList.length === 0) {
      return (
        <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          {emptyMessage}
        </Typography>
      );
    }
    const handleJoinSession = (sessionId) => {
      // Navigate to a route where the Jitsi meeting will be displayed
      window.location.href = `/meeting/${sessionId}`;
    };
    
    return meetingList.map((meeting) => (
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
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
          },
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            backgroundColor: '#e3f2fd',
            borderRadius: 2,
          }}
        >
          <VideoCameraFrontIcon sx={{ fontSize: 30, color: '#166A9E' }} />
        </Box>
        <Box sx={{ flexGrow: 1, pl: 3 }}>
          <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#004080' }}>
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
        <Button
  variant="contained"
  onClick={() => handleJoinSession(meeting._id)}
  sx={{
    ml: 3,
    backgroundColor: '#166A9E',
    color: '#fff',
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#003366',
    },
  }}
>
  Join Session
</Button>

      </Paper>
    ));
  };

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

  if (error) {
    if (error === 'No sessions found for this student.') {
      return (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
          <EventNoteIcon sx={{ fontSize: 80, color: '#166A9E' }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2 }}>
            No sessions found for you.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
            You haven’t scheduled any sessions yet. Start by scheduling a session to see it here.
          </Typography>
        </Container>
      );
    } else {
      return (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2" sx={{ color: 'red' }}>
            {error}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
            Please check your connection or try refreshing the page.
          </Typography>
        </Container>
      );
    }
  }

  return (
    <Container>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#004080' }}>
          Today
        </Typography>
        {renderMeetings(
          filterMeetings(
            (meeting) => new Date(meeting.sessionDateTime).toISOString().split('T')[0] === today
          ),
          'No sessions today'
        )}
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#004080' }}>
          This Month
        </Typography>
        {renderMeetings(
          filterMeetings(
            (meeting) =>
              new Date(meeting.sessionDateTime).getMonth() + 1 === currentMonth &&
              new Date(meeting.sessionDateTime).getFullYear() === currentYear
          ),
          'No sessions this month'
        )}
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#004080' }}>
          Later
        </Typography>
        {renderMeetings(
          filterMeetings(
            (meeting) =>
              new Date(meeting.sessionDateTime).getMonth() + 1 > currentMonth ||
              new Date(meeting.sessionDateTime).getFullYear() > currentYear
          ),
          'No sessions later'
        )}
      </Box>
    </Container>
  );
};

export default SchedulePage;
