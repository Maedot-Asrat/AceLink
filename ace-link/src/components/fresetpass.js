import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/pass/reset-password/${token}`, { password });
      setMessage('Password has been reset successfully.');
      setTimeout(() => navigate('/loginStudent'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Reset Password
        </Typography>
        <Typography variant="body1">
          Enter your new password.
        </Typography>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Reset Password
        </Button>
        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ResetPassword;
