import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';

const TutorSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve tutorId from local storage
    const tutorId = localStorage.getItem('tutorId');
    
    if (!tutorId) {
      setError('Tutor ID not found in local storage.');
      setLoading(false);
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trust/sessions/tutor/${tutorId}`);
        setSessions(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Failed to fetch sessions.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
  
      {sessions.length === 0 ? (
        <Typography sx={{ textAlign: 'center' }}>No sessions found for this tutor.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '100%', mx: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Students Involved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session._id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{new Date(session.sessionDateTime).toLocaleString()}</TableCell>
                  <TableCell>{session.duration} mins</TableCell>
                  <TableCell>
                    {session.studentsInvolved.map((student) => student.name).join(', ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TutorSessionsPage;
