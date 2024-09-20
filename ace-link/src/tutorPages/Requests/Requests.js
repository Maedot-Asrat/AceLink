import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Alert,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';

const TutorRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tutorId, setTutorId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sessionDetails, setSessionDetails] = useState({
    title: 'Tutoring Session',
    sessionDateTime: '',
    duration: 60,
    notes: 'Please be prepared with your questions.',
  });

  // Retrieve tutorId from localStorage
  useEffect(() => {
    const storedTutorId = localStorage.getItem('tutorId');
    if (storedTutorId) {
      setTutorId(storedTutorId);
    } else {
      setError('Tutor ID not found in local storage.');
    }
  }, []);

  // Fetch requests when tutorId is available
  useEffect(() => {
    if (tutorId) {
      const fetchRequests = async () => {
        try {
          const response = await axios.get(`https://acelink-w1qp.onrender.com/tutor/${tutorId}/requests`);
          setRequests(response.data.requests);
        } catch (err) {
          setError('An error occurred while fetching the requests.');
        }
      };
      fetchRequests();
    }
  }, [tutorId]);

  // Handle modal open and close
  const handleClickOpen = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  // Handle input changes for session details
  const handleInputChange = (e) => {
    setSessionDetails({
      ...sessionDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Create a new session
  const createSession = async () => {
    try {
      const response = await axios.post(`https://acelink-w1qp.onrender.com/trust/sessions`, {
        ...sessionDetails,
        sessionDateTime: new Date(sessionDetails.sessionDateTime),
        studentsInvolved: [selectedRequest.student_id], // Use student_id here
        tutorId,
      });
      setSuccess('Session scheduled successfully');
      handleClose(); // Close modal after successful session creation
    } catch (err) {
      setError('An error occurred while scheduling the session.');
    }
  };

  // Handle status update
  const updateRequestStatus = async (requestId, status) => {
    try {
      await axios.patch(`https://acelink-w1qp.onrender.com/request/${requestId}`, { status });
      setSuccess(`Request ${status.toLowerCase()} successfully`);
      setRequests(requests.map((req) => (req._id === requestId ? { ...req, status } : req)));

      // If approved, open modal to create session
      if (status === 'Approved') {
        const approvedRequest = requests.find((req) => req._id === requestId);
        if (approvedRequest) {
          handleClickOpen(approvedRequest);
        }
      }
    } catch (err) {
      setError('An error occurred while updating the request.');
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: '20px', sm: '30px' },
        maxWidth: '900px',
        margin: 'auto',
        borderRadius: '16px',
        backgroundColor: '#f5f7fa',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        minHeight: '80vh',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: '20px' }}>
          {success}
        </Alert>
      )}

      {requests.length === 0 ? (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontStyle: 'italic',
            fontSize: '1.1rem',
          }}
        >
          No requests found.
        </Typography>
      ) : (
        requests.map((request) => (
          <Card
            key={request._id}
            sx={{
              marginBottom: '20px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <CardContent sx={{ padding: '24px 32px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0A1929' }}>
                  {request.student_name}
                </Typography>
                <Chip
                  label={request.status}
                  sx={{
                    backgroundColor:
                      request.status === 'Pending'
                        ? '#FFE082'
                        : request.status === 'Approved'
                        ? '#81C784'
                        : '#E57373',
                    color: request.status === 'Pending' ? '#6C7A89' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                />
              </Box>
              <Divider sx={{ marginY: '16px' }} />
              <Typography variant="body1" sx={{ color: '#5f6368', lineHeight: 1.8 }}>
                {request.message}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '12px' }}>
                <strong>Student ID:</strong> {request.student_id} {/* Display student ID */}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
                paddingX: '32px',
                paddingBottom: '24px',
                gap: '16px',
              }}
            >
              {request.status === 'Pending' && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => updateRequestStatus(request._id, 'Approved')}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#115293' },
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      borderRadius: '24px',
                      paddingX: '24px',
                      paddingY: '10px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => updateRequestStatus(request._id, 'Rejected')}
                    sx={{
                      backgroundColor: '#f44336',
                      '&:hover': { backgroundColor: '#c62828' },
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      borderRadius: '24px',
                      paddingX: '24px',
                      paddingY: '10px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))
      )}

      {/* Session creation modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Tutoring Session</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Session Title"
            type="text"
            name="title"
            value={sessionDetails.title}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Session Date and Time"
            type="datetime-local"
            name="sessionDateTime"
            value={sessionDetails.sessionDateTime}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Session Duration (minutes)"
            type="number"
            name="duration"
            value={sessionDetails.duration}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Session Notes"
            type="text"
            name="notes"
            value={sessionDetails.notes}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createSession} color="primary">
            Create Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutorRequestsPage;
