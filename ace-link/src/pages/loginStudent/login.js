import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Checkbox, Link, Grid, Paper } from '@mui/material';
import logo from '../../assets/Logo.png';
import image1 from '../../assets/image1.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      localStorage.setItem('id', user.id);

      if (user.role === 'Student') {
        const studentId = user.profileId;
        localStorage.setItem('studentId', studentId);
      }

      alert('Login successful');
      navigate('/tutors');
    } catch (error) {
      alert('Error during login: ' + (error.response?.data?.error || 'Please try again.'));
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', mb: 2, alignSelf: 'flex-start', ml: 2, gap: '0.4rem' }}
      >
        <img src={logo} alt="Logo" style={{ height: '3em', marginRight: '0.3rem' }} />
        <Typography variant="h5" component="h1">AceLink</Typography>
      </Box>

      <Box sx={{ position: 'absolute', top: 40, right: 40 }}>
        <Button
          variant="outlined"
          sx={{
            mr: 2,
            color: '#003360',
            borderColor: '#003360',
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: '#003360',
              color: 'white',
            },
          }}
          onClick={() => navigate('/registerTutor')}
        >
          Sign up as a Tutor
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: '#003360',
            backgroundColor: '#003360',
            ':hover': {
              backgroundColor: '#003360',
              color: 'white',
            },
          }}
          onClick={() => navigate('/registerStudent')}
        >
          Sign up as a Student
        </Button>
      </Box>

      <Grid
        container
        spacing={4}  // Increase spacing to add more space between columns
        component={Paper}
        elevation={0}
        sx={{ padding: '2rem', maxWidth: '1200px', alignItems: 'center', margin: '0.5rem auto' }} // Adjust padding and margin for better layout
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            component="img"
            src={image1}
            alt="Login Illustration"
            sx={{ maxWidth: '100%', height: '40rem', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '85%', margin: '0 auto', ml:'3rem' }} // Adjusted margin to center form
          >
            <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
              Welcome, Student!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Welcome back! Please login to your account.
            </Typography>

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ maxWidth: '80%' }} // Decrease width of input fields
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ maxWidth: '80%' }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">
                  Remember me
                </Typography>
              </Box>
              <Link href="/forgotpassword" variant="body2" sx={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                maxWidth: '80%', // Align with text fields
                mt: 1,
                ':hover': {
                  backgroundColor: '#003360', // Darker blue hover effect
                },
              }}
            >
              LOGIN
            </Button>

            <Typography variant="body2" sx={{ mt: 0, textAlign: 'center', width: '100%' }}>
              Don't have an account? <Link href="/registerStudent" sx={{ textDecoration: 'none' }}>Sign up</Link>
            </Typography>

          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
