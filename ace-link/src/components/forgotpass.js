import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/pass/forgot-password`, { email });
      setMessage('Password reset email has been sent.');
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
          Forgot Password
        </Typography>
        <Typography variant="body1">
          Enter your email address and we will send you a password reset link.
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Send Reset Link
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

export default ForgotPassword;
