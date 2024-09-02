import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Checkbox, Link, Grid, Paper } from '@mui/material';
import logo from '../../assets/Logo.png';
import signupImg from '../../assets/signup.png';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Student',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData);
      const { token, user } = res.data;

      alert('Registration successful');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('userId', user._id);

      navigate(`/polishProfile`);
    } catch (error) {
      alert('Error during registration');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, alignSelf: 'flex-start', ml: 2, gap:'0.4rem'}}>
        <img src={logo} alt="Logo" style={{ height: '3em', marginRight: '0.3rem' }} />
        <Typography variant="h5" component="h1">AceLink</Typography>
      </Box>

      <Grid container spacing={4} component={Paper} elevation={0} sx={{ padding: '1rem', maxWidth: '1200px', alignItems: 'center' , margin:'0.5rem'}}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component="img" src={signupImg} alt="Signup" sx={{ maxWidth: '100%', height: '40rem', borderRadius: '10px' }} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '90%', margin: '0 auto' }}>
            <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>Register as a Student</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>Let’s get you all set up for the best experience in learning.</Typography>

            <TextField 
              label="Username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              fullWidth 
              required 
              sx={{ maxWidth: '90%' }}  // Reduced width
            />
            <TextField 
              label="Email" 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              fullWidth 
              required 
              sx={{ maxWidth: '90%' }}  // Reduced width
            />
            <TextField 
              label="Password" 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              fullWidth 
              required 
              sx={{ maxWidth: '90%' }}  // Reduced width
            />
            <TextField 
              label="Confirm Password" 
              type="password" 
              name="confirmPassword" 
              fullWidth 
              required 
              sx={{ maxWidth: '90%' }}  // Reduced width
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 0 }}>
              <Checkbox required />
              <Typography variant="body2">I agree to all the <Link href="#" sx={{ textDecoration: 'none' }}>Terms</Link> and <Link href="#" sx={{ textDecoration: 'none' }}>Privacy Policies</Link></Typography>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ 
                maxWidth: '90%', // Align with text fields
                mt: 0,
                ':hover': {
                  backgroundColor: '#003360', // Darker blue hover effect
                }
              }}
            >
              CREATE ACCOUNT
            </Button>
            
            <Typography variant="body2" sx={{ mt: 0, textAlign: 'center' }}>
              Already have an account? <Link href="/loginStudent" sx={{ textDecoration: 'none' }}>Login</Link>
            </Typography>
            <Link href="/registerTutor" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 0, textDecoration: 'none'}}>Register as a Tutor</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
