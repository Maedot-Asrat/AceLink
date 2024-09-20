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
import { ToggleButton, ToggleButtonGroup, Stack } from '@mui/material'
import logo from '../../assets/Logo.png';

const steps = ['Personal Info', 'Educational Details', 'Parent Contact', 'Additional Details'];

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
  const [activeStep, setActiveStep] = useState(0);
  const userId = localStorage.getItem('userId');

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      // alert("User not authenticated");
      return;
    }

    const profileData = {
      grade_level: gradeLevel,
      age,
      goals,
      learning_style: learningStyle,
      subject_interests: subjectInterests,
      // availability:availability,
      preferred_language: preferredLanguage,
      current_needs: currentNeeds,
      profile_picture: profilePicture ? profilePicture.name : undefined,
      parent_contact: {
        name: parentContactName,
        email: parentContactEmail,
        phone: parentContactPhone,
      },
      study_habits: studyHabits,
      extracurricular_activities: extracurricularActivities.split(',').map(activity => activity.trim()),
      health_considerations: healthConsiderations,
      gender_preference: genderPreference,
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
      navigate(`/loginStudent`);
    } catch (error) {
      console.error('Profile update error:', error.response ? error.response.data : error.message);
      // alert('Failed to update profile. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {/* Profile Picture */}
            <Grid item xs={12}>
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
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    hidden
                  />
                </IconButton>
                <Typography variant="body2" mt={1}
                >
                  Upload your profile picture
                </Typography>
              </Box>
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
                // variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0", // Set the background color
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the border
                  },
                  fontFamily: 'Poppins', // matching the font in the image
                  fontSize: '16px',      // matching the size in the image
                  fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
                  color: "#313131",
                  letterSpacing: '0%',   // as shown in the image
                  lineHeight: 'auto', 
                  opacity: 0.7,
                  
                }}
              />
            </Grid>

             {/* Grade Level */}
             <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel>Current Grade Level</InputLabel>
                <Select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  required
                  label="Current Grade Level"
                  sx={{
                    backgroundColor: "#f0f0f0", // Set the background color
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove the border
                    },
                    fontFamily: 'Poppins', // matching the font in the image
                    fontSize: '16px',      // matching the size in the image
                    fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
                    color: "#313131",
                    letterSpacing: '0%',   // as shown in the image
                    lineHeight: 'auto', 
                    opacity: 0.7,
                    
                  }}
                  
                >
                  <MenuItem value="Bachelor">Bachelor</MenuItem>
                  <MenuItem value="Master">Master</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
  {/* Learning Style */}
  <Grid item xs={12}>
    <Box>
      {/* Preferred Learning Style Label */}
      <Typography variant="body2" gutterBottom 
      sx={{fontFamily: 'Poppins', 
                    fontSize: '16px',      
                    fontWeight: 400,       
                    color: "#313131",
                    letterSpacing: '0%',   
                    lineHeight: 'auto', 
                    opacity: 0.7,
                    marginTop:'30px'}}>
        Preferred Learning Style
      </Typography>

      {/* Buttons with spacing and border radius */}
      <Stack direction="row" spacing={2} sx={{ marginTop: 2, width:'60vw', justifyContent:'center'}}>
        <ToggleButtonGroup
          value={learningStyle}
          onChange={(event, newLearningStyles) => setLearningStyle(newLearningStyles)}
          aria-label="preferred learning style"
          fullWidth
          multiple
          sx={{ gap: 4 }}
        >
          <ToggleButton
            value="Visual"
            aria-label="visual"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px', // Rounded corners
              boxShadow: '1px 1px 2px rgba(205, 205, 205, 0.25)', // Drop shadow
              '&.Mui-selected': {
                backgroundColor: '#3E98FF',
                color: '#fff',
                boxShadow: '1px 1px 4px rgba(62, 152, 255, 0.5)',
              },
              '&:hover': {
                backgroundColor: 'rgba(62, 152, 255, 0.1)',
              },
              padding: '10px 20px', 
            }}
          >
            Visual
          </ToggleButton>

          <ToggleButton
            value="Auditory"
            aria-label="auditory"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '1px 1px 2px rgba(205, 205, 205, 0.25)',
              '&.Mui-selected': {
                backgroundColor: '#3E98FF',
                color: '#fff',
                boxShadow: '1px 1px 4px rgba(62, 152, 255, 0.5)',
              },
              '&:hover': {
                backgroundColor: 'rgba(62, 152, 255, 0.1)',
              },
              padding: '10px 20px',
            }}
          >
            Auditory
          </ToggleButton>

          <ToggleButton
            value="Kinesthetic"
            aria-label="kinesthetic"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '1px 1px 2px rgba(205, 205, 205, 0.25)',
              '&.Mui-selected': {
                backgroundColor: '#3E98FF',
                color: '#fff',
                boxShadow: '1px 1px 4px rgba(62, 152, 255, 0.5)',
              },
              '&:hover': {
                backgroundColor: 'rgba(62, 152, 255, 0.1)',
              },
              padding: '10px 20px',
            }}
          >
            Kinesthetic
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  </Grid>

  {/* Subject Interests */}
  <Grid item xs={12}>
    <FormControl fullWidth variant="outlined">
      <InputLabel>Subject Interests</InputLabel>
      <Select
        multiple
        value={subjectInterests}
        onChange={(e) => setSubjectInterests(e.target.value)}
        required
        label="Subject Interests"
        sx={{
          backgroundColor: "#f0f0f0", // Set the background color
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove the border
          },
          fontFamily: 'Poppins', // matching the font in the image
          fontSize: '16px',      // matching the size in the image
          fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
          color: "#313131",
          letterSpacing: '0%',   // as shown in the image
          lineHeight: 'auto', 
          opacity: 0.7,
          
        }}
      >
        <MenuItem value="Math">Math</MenuItem>
        <MenuItem value="Science">Science</MenuItem>
        <MenuItem value="History">History</MenuItem>
        <MenuItem value="Literature">Literature</MenuItem>
        <MenuItem value="Technology">Technology</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Goals */}
  <Grid item xs={12}>
    <TextField
      label="Your Learning Goals"
      value={goals}
      onChange={(e) => setGoals(e.target.value)}
      fullWidth
      variant="outlined"
      sx={{
        backgroundColor: "#f0f0f0", // Set the background color
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove the border
        },
        fontFamily: 'Poppins', // matching the font in the image
        fontSize: '16px',      // matching the size in the image
        fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
        color: "#313131",
        letterSpacing: '0%',   // as shown in the image
        lineHeight: 'auto', 
        opacity: 0.7,
        
      }}
    />
  </Grid>
</Grid>

        );
      case 2:
        return (
          <Grid container spacing={3} sx={{justifyContent:'center', mt:2}}>
            {/* Parent Contact Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parent's Name"
                value={parentContactName}
                onChange={(e) => setParentContactName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0", // Set the background color
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the border
                  },
                  fontFamily: 'Poppins', // matching the font in the image
                  fontSize: '16px',      // matching the size in the image
                  fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
                  color: "#313131",
                  letterSpacing: '0%',   // as shown in the image
                  lineHeight: 'auto', 
                  opacity: 0.7,
                  
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Parent's Email"
                type="email"
                value={parentContactEmail}
                onChange={(e) => setParentContactEmail(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f0f0", // Set the background color
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the border
                  },
                  fontFamily: 'Poppins', // matching the font in the image
                  fontSize: '16px',      // matching the size in the image
                  fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
                  color: "#313131",
                  letterSpacing: '0%',   // as shown in the image
                  lineHeight: 'auto', 
                  opacity: 0.7,
                  
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField
                label="Parent's Phone"
                value={parentContactPhone}
                onChange={(e) => setParentContactPhone(e.target.value)}
                fullWidth
                variant="outlined"
                 sx={{
                    backgroundColor: "#f0f0f0", // Set the background color
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove the border
                    },
                    fontFamily: 'Poppins', // matching the font in the image
                    fontSize: '16px',      // matching the size in the image
                    fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
                    color: "#313131",
                    letterSpacing: '0%',   // as shown in the image
                    lineHeight: 'auto', 
                    opacity: 0.7,
                    alignContent:'center',
                    justifyContent:'center'
                    
                  }}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
  {/* Health Considerations */}
  <Grid item xs={12}>
    
    <TextField
      label="Health Considerations"
      
      placeholder="Any allergies, special needs, etc."
      value={healthConsiderations}
      onChange={(e) => setHealthConsiderations(e.target.value)}
      fullWidth
      variant="outlined"
      multiline
      rows={3} // Allow for longer text entries
    />
  </Grid>

  {/* Gender Preference */}
  <Grid item xs={12}>
    <FormControl fullWidth variant="outlined">
      <InputLabel>Gender Preference of Tutor</InputLabel>
      <Select
        value={genderPreference}
        onChange={(e) => setGenderPreference(e.target.value)}
        label="Gender Preference of Tutor"
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="No Preference">No Preference</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Availability */}
  <Grid item xs={12}>
    <TextField
      label="Availability"
      placeholder="Specify your availability (e.g., Weekdays, Weekends, Evenings)"
      value={availability}
      onChange={(e) => setAvailability(e.target.value)}
      fullWidth
      variant="outlined"
    />
  </Grid>

  {/* Preferred Language */}
  <Grid item xs={12}>
    <FormControl fullWidth variant="outlined">
      <InputLabel>Preferred Language</InputLabel>
      <Select
        value={preferredLanguage}
        onChange={(e) => setPreferredLanguage(e.target.value)}
        label="Preferred Language"
      >
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Spanish">Spanish</MenuItem>
        <MenuItem value="French">French</MenuItem>
        <MenuItem value="Mandarin">Mandarin</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Study Habits */}
  <Grid item xs={12}>
    <TextField
      label="Describe Your Study Habits"
      placeholder="e.g., Focused, Group Study, Regular Breaks"
      value={studyHabits}
      onChange={(e) => setStudyHabits(e.target.value)}
      fullWidth
      variant="outlined"
    />
  </Grid>

  {/* Extracurricular Activities */}
  <Grid item xs={12}>
    <TextField
      label="Extracurricular Activities"
      placeholder="List activities (e.g., Sports, Music, Volunteering)"
      value={extracurricularActivities}
      onChange={(e) => setExtracurricularActivities(e.target.value)}
      fullWidth
      variant="outlined"
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
        sx={{ display: 'flex', alignItems: 'center', mt: 2, alignSelf: 'left', ml: 0, gap: '0.4rem', justifyContent:'flex-end' }}
      >
        <img src={logo} alt="Logo" style={{ height: '3em', marginRight: '0.3rem' }} />
        <Typography variant="h5" component="h1"
        sx={{fontFamily:"Poppins",   color: "#313131",fontWeight:'500'}}>AceLink</Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Paper elevation={0} sx={{ padding: 4 }}>
        <Typography 
  variant="h4" 
  align="flex-start" 
  gutterBottom
  sx={{
    fontFamily: 'Poppins', // matching the font in the image
    fontSize: '40px',      // matching the size in the image
    fontWeight: 600,       // 'Regular' in Poppins corresponds to 400
    color: "#05436A",
    letterSpacing: '0%',   // as shown in the image
    lineHeight: 'auto',    // 'Auto' for line height
   
    marginTop: '10px',
  }}
>
  Polishing Your Profile
</Typography>
<Typography
  variant="body1"
  align="left"  // align="left" instead of flex-start for proper alignment
  gutterBottom
  sx={{
    fontFamily: 'Poppins', // matching the font in the image
    fontSize: '16px',      // matching the size in the image
    fontWeight: 400,       // 'Regular' in Poppins corresponds to 400
    color: "#313131",
    letterSpacing: '0%',   // as shown in the image
    lineHeight: 'auto',    // 'Auto' for line height
    marginBottom: '50px',
    marginTop: '10px',
  }}
>
  Let’s get you all set up so you can have the best experience in learning.
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
      borderColor: '#166A9E', // Default border color
      color: '#166A9E', // Default text color
      '&:hover': {
        borderColor: '#0F4C75', // Deeper blue for the hover border
        backgroundColor: 'rgba(15, 76, 117, 0.1)', // Slight background color change on hover
        color: '#0F4C75', // Deeper blue for the hover text color
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
          backgroundColor: '#0F4C75', // Deeper blue on hover
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
          backgroundColor: '#0F4C75', // Deeper blue on hover
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

export default ProfilePage;
