import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';

function TitleBar({ showButtons = true }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: '0px 3.13px 35.16px rgba(0, 0, 0, 0.06)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo and AceLink text */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <img src={logo} alt="AceLink Logo" style={{ height: '3em', marginRight: '0.3rem' }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', color: '#113C49' }}>
            ACELINK
          </Typography>
        </Box>

        {/* Right side: Buttons */}
        {showButtons && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;
