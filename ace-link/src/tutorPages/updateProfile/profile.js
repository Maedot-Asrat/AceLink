import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import logo from '../../assets/Logo.png';

const steps = ['Personal Info', 'Expertise & Experience', 'Availability & Preferences', 'Additional Details'];

const EditProfile = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  // State variables
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [subjectExpertise, setSubjectExpertise] = useState([]);
  const [fee, setFee] = useState('');
  const [gradeLevels, setGradeLevels] = useState([]);
  const [teachingStyle, setTeachingStyle] = useState('');
  const [availability, setAvailability] = useState({});
  const [availabilityTimeZone, setAvailabilityTimeZone] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [specializationAreas, setSpecializationAreas] = useState([]);
  const [certifications, setCertifications] = useState('');
  const [tutoringApproach, setTutoringApproach] = useState('');
  const [professionalDevelopment, setProfessionalDevelopment] = useState('');
  const [personalInterests, setPersonalInterests] = useState('');
  const userId = localStorage.getItem('userId');

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    // Preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated");
      return;
    }

    const profileData = {
      subject_expertise: subjectExpertise,
      fee,
      grade_levels: gradeLevels,
      teaching_style: teachingStyle,
      availability,
      languages_spoken: languagesSpoken,
      experience,
      qualifications,
      profile_picture: profilePicture ? profilePicture.name : undefined,
      specialization_areas: specializationAreas,
      certifications: certifications.split(',').map(cert => cert.trim()),
      availability_time_zone: availabilityTimeZone,
      tutoring_approach: tutoringApproach,
      professional_development: professionalDevelopment,
      personal_interests: personalInterests.split(',').map(interest => interest.trim()),
    };

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profile', JSON.stringify(profileData));

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response);
      navigate('/dashboardTutor'); // Redirect to tutor dashboard or appropriate page
    } catch (error) {
      console.error('Profile update error:', error.response ? error.response.data : error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
      
            <Grid item xs={12}>
              <Box textAlign="center" mb={4}>
                <IconButton component="label">
                  <Avatar
                    src={previewPicture || ''}
                    sx={{ width: 120, height: 120, margin: '0 auto', boxShadow: 3 }}
                  >
                    {!profilePicture && <AddAPhoto fontSize="large" />}
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </IconButton>
                <Typography variant="body2" mt={1}>
                  Upload your profile picture
                </Typography>
              </Box>
            </Grid>

    
            <Grid item xs={12}>
              <TextField
                label="Qualifications"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                required
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

  
            <Grid item xs={12} sm={6}>
              <TextField
                label="Years of Experience"
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

   
            <Grid item xs={12} sm={6}>
              <TextField
                label="Certifications"
                placeholder="Separate with commas"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
   
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subject Expertise</InputLabel>
                <Select
                  multiple
                  value={subjectExpertise}
                  onChange={(e) => setSubjectExpertise(e.target.value)}
                  required
                  label="Subject Expertise"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="Math">Math</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>

    
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Grade Levels</InputLabel>
                <Select
                  multiple
                  value={gradeLevels}
                  onChange={(e) => setGradeLevels(e.target.value)}
                  required
                  label="Grade Levels"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="Elementary">Elementary</MenuItem>
                  <MenuItem value="Middle School">Middle School</MenuItem>
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="College">College</MenuItem>
              
                </Select>
              </FormControl>
            </Grid>

         
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fee (per hour)"
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <TextField
                label="Specialization Areas"
                placeholder="Separate with commas"
                value={specializationAreas}
                onChange={(e) => setSpecializationAreas(e.target.value.split(',').map(area => area.trim()))}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
           
            <Grid item xs={12}>
              <TextField
                label="Teaching Style"
                value={teachingStyle}
                onChange={(e) => setTeachingStyle(e.target.value)}
                required
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

           
            <Grid item xs={12}>
              <TextField
                label="Tutoring Approach"
                value={tutoringApproach}
                onChange={(e) => setTutoringApproach(e.target.value)}
                required
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <TextField
                label="Availability Time Zone"
                value={availabilityTimeZone}
                onChange={(e) => setAvailabilityTimeZone(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

         
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Languages Spoken</InputLabel>
                <Select
                  multiple
                  value={languagesSpoken}
                  onChange={(e) => setLanguagesSpoken(e.target.value)}
                  label="Languages Spoken"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Mandarin">Mandarin</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
             
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
           
            <Grid item xs={12}>
              <TextField
                label="Professional Development"
                value={professionalDevelopment}
                onChange={(e) => setProfessionalDevelopment(e.target.value)}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>

           
            <Grid item xs={12}>
              <TextField
                label="Personal Interests"
                placeholder="Separate with commas"
                value={personalInterests}
                onChange={(e) => setPersonalInterests(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
     
      <Box
        sx={{ display: 'flex', alignItems: 'center', mt: 2, alignSelf: 'left', ml: 0, gap: '0.4rem', justifyContent: 'flex-end' }}
      >
        <img src={logo} alt="Logo" style={{ height: '3em', marginRight: '0.3rem' }} />
        <Typography variant="h5" component="h1" sx={{ fontFamily: "Poppins", color: "#313131", fontWeight: '500' }}>
          AceLink
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Paper elevation={0} sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            align="flex-start"
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontSize: '40px',
              fontWeight: 600,
              color: "#05436A",
              letterSpacing: '0%',
              lineHeight: 'auto',
              marginTop: '10px',
            }}
          >
            Enhancing Your Tutor Profile
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontWeight: 400,
              color: "#313131",
              letterSpacing: '0%',
              lineHeight: 'auto',
              marginBottom: '50px',
              marginTop: '10px',
            }}
          >
            Let's complete your profile to connect you with the right students.
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            <Box sx={{ marginTop: 4 }}>
              {renderStepContent(activeStep)}
            </Box>
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderColor: '#166A9E',
                  color: '#166A9E',
                  '&:hover': {
                    borderColor: '#0F4C75',
                    backgroundColor: 'rgba(15, 76, 117, 0.1)',
                    color: '#0F4C75',
                  },
                }}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#0F4C75',
                    },
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#0F4C75',
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditProfile;
