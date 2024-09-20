import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Checkbox, Link, Grid, Paper } from '@mui/material';
import image1 from '../../assets/image1.png';
import TitleBar from '../../components/titlebar/TitleBar';

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
      localStorage.setItem('tutorId',user.profileId);
      
      

      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Error during login: ' + (error.response?.data?.error || 'Please try again.'));
    }
  };

  return (
    <>
      <TitleBar /> {/* Add the TitleBar component here */}
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100vh', position: 'relative' }}
    >

   

      {/* Main Content */}
      <Grid
        container
        spacing={4}
        component={Paper}
        elevation={0}
        sx={{ padding: '1rem', maxWidth: '1200px', alignItems: 'center', margin: '0.5rem', boxShadow: 'none' }}
      >
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'2' }}
        >
          <Box
            component="img"
            src={image1}
            alt="Login Illustration"
            sx={{ maxWidth: '100%', height: '40rem', borderRadius: '10px' }}
          />
        </Grid>

        {/* Login Form */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '85%', margin: '0 auto', justifyContent:'center' }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 , justifySelf:'flex-start',display:'flex',flexDirection:'column' ,alignItems:'baseline'}}>
              <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome, Tutor!
              </Typography>
              <Typography variant="body1">
                Please, log in to your account as a tutor.
              </Typography>
            </Box>

            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ maxWidth: '80%', mb: 2 }} 
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ maxWidth: '80%', mb: 0}}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', mb: 0 }}>
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">Remember me</Typography>
              </Box> */}
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
                maxWidth: '80%',
                mt: 0,
                mb: 0,
                backgroundColor: '#003360',
                ':hover': {
                  backgroundColor: '#002244',
                },
              }}
            >
              Login
            </Button>

          

          

            <Typography variant="body2" align="center">
              Don't have an account? <Link href="/registerStudent" sx={{ textDecoration: 'none' }}>Signup.</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Login;
