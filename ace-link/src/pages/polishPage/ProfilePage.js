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
  Paper
} from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import logo from '../../assets/Logo.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [gradeLevel, setGradeLevel] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [subjectInterests, setSubjectInterests] = useState([]);
  const [availability, setAvailability] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [currentNeeds, setCurrentNeeds] = useState('');
  const [parentContactName, setParentContactName] = useState('');
  const [parentContactEmail, setParentContactEmail] = useState('');
  const [parentContactPhone, setParentContactPhone] = useState('');
  const [studyHabits, setStudyHabits] = useState('');
  const [extracurricularActivities, setExtracurricularActivities] = useState('');
  const [healthConsiderations, setHealthConsiderations] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const userId = localStorage.getItem('userId');

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubjectInterestsChange = (e) => {
    setSubjectInterests(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profile', JSON.stringify({
      gradeLevel,
      age,
      goals,
      learningStyle,
      subjectInterests,
      availability,
      preferredLanguage,
      currentNeeds,
      parentContactName,
      parentContactEmail,
      parentContactPhone,
      studyHabits,
      extracurricularActivities,
      healthConsiderations,
      genderPreference
    }));

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert("Profile updated successfully");
      navigate(`/loginStudent`);
    } catch (error) {
      console.error('Profile update error:', error.response ? error.response.data : error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="Logo" style={{ height: '2em', marginRight: '1rem' }} />
        <Typography variant="h5" component="h5" fontWeight="normal">
          AceLink
        </Typography>
      </Box>

      {/* Form Container */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Polishing your profile
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Let’s get you all set up so you can have the best experience in learning.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box textAlign="center" mb={4}>
            <IconButton component="label">
              <Avatar
                src={profilePicture ? URL.createObjectURL(profilePicture) : ''}
                sx={{ width: 120, height: 120, margin: '0 auto', boxShadow: 3 }}
              >
                {!profilePicture && <AddAPhoto fontSize="large" />}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                hidden
              />
            </IconButton>
            <Typography variant="body2" mt={1}>
              Upload your profile picture
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Grade Level */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Current Grade Level</InputLabel>
                <Select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  required
                  label="Current Grade Level"
                >
                  <MenuItem value="Bachelor">Bachelor</MenuItem>
                  <MenuItem value="Master">Master</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Goals */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Learning Style */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Learning Style"
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Subject Interests */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subject Interests</InputLabel>
                <Select
                  multiple
                  value={subjectInterests}
                  onChange={handleSubjectInterestsChange}
                  required
                  label="Subject Interests"
                >
                  <MenuItem value="Math">Math</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="Literature">Literature</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Availability */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Preferred Language */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preferred Language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Current Needs */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Needs"
                value={currentNeeds}
                onChange={(e) => setCurrentNeeds(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Parent's Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parent's Name"
                value={parentContactName}
                onChange={(e) => setParentContactName(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Parent's Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parent's Email"
                type="email"
                value={parentContactEmail}
                onChange={(e) => setParentContactEmail(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Parent's Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parent's Phone"
                value={parentContactPhone}
                onChange={(e) => setParentContactPhone(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Study Habits */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Study Habits"
                value={studyHabits}
                onChange={(e) => setStudyHabits(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Extracurricular Activities */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Extracurricular Activities"
                value={extracurricularActivities}
                onChange={(e) => setExtracurricularActivities(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Health Considerations */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Health Considerations"
                value={healthConsiderations}
                onChange={(e) => setHealthConsiderations(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Gender Preference */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender Preference</InputLabel>
                <Select
                  value={genderPreference}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  required
                  label="Gender Preference"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="No Preference">No Preference</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box mt={5} textAlign="center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            >
              Save and Continue
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

