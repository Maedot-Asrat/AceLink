import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Divider, Button, Grid, Chip, Modal, TextField, Snackbar, Alert } from '@mui/material';
import { FaStar } from 'react-icons/fa';
import axios from "axios";

export default function TutorProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/tutor/${id}`);
        setProfile(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="not-found">{error}</div>;
  }

  return (
    <div className="tutor-profile-container">
      <TutorProfilePage
        key={profile.tutor._id}
        id={profile.tutor._id}
        username={profile.tutor.username}
        email={profile.tutor.email}
        performanceMetrics={profile.tutor.profile.performance_metrics}
        subjectExpertise={profile.tutor.profile.subject_expertise}
        fee={profile.tutor.fee}
        gradeLevels={profile.tutor.profile.grade_levels}
        teachingStyle={profile.tutor.profile.teaching_style}
        availability={profile.tutor.profile.availability}
        languagesSpoken={profile.tutor.profile.languages_spoken}
        experience={profile.tutor.profile.experience}
        qualifications={profile.tutor.profile.qualifications}
        profilePicture={profile.tutor.profile.profile_picture}
        specializationAreas={profile.tutor.profile.specialization_areas}
        certifications={profile.tutor.profile.certifications}
        availabilityTimeZone={profile.tutor.profile.availability_time_zone}
        tutoringApproach={profile.tutor.profile.tutoring_approach}
        pastStudentOutcomes={profile.tutor.profile.past_student_outcomes}
        professionalDevelopment={profile.tutor.profile.professional_development}
        personalInterests={profile.tutor.profile.personal_interests}
        averageRating={profile.tutor.average_rating}
        ratings={profile.tutor.ratings}
      />
    </div>
  );
}

function TutorProfilePage({
  id, username, email, performanceMetrics, subjectExpertise, fee, gradeLevels, teachingStyle, availability,
  languagesSpoken, experience, qualifications, profilePicture, specializationAreas, certifications, availabilityTimeZone,
  tutoringApproach, pastStudentOutcomes, professionalDevelopment, personalInterests, averageRating, ratings
}) {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionRequestError, setSessionRequestError] = useState(null);

  const handleContactClick = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleSendRequest = async () => {
    const studentId = localStorage.getItem('studentId'); 
    const studentName = localStorage.getItem('studentName'); 
    console.log(id);// Retrieve studentId from local storage
    if (!studentId) {
      setSessionRequestError('You must be logged in as a student to request a session.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/request`, {
        student_id: studentId,
        student_name: studentName,
        tutor_id: id,
        message: message
      });
      setOpenSnackbar(true);
      setMessage('');
      setOpenModal(false);
    } catch (error) {
      console.error("Error sending request:", error);
      setSessionRequestError('Failed to send request. Please try again.');
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleErrorSnackbarClose = () => setSessionRequestError(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
      {/* Profile Info */}
      <Box sx={{ width: '100%', p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${profilePicture}`} alt={username} sx={{ width: 150, height: 150, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{username || 'No username'}</Typography>
          <Typography variant="body1" color="text.secondary">{email || 'No email provided'}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <FaStar style={{ color: '#fbbf24', marginRight: 4 }} /> {averageRating || 'N/A'} ({ratings.length} ratings)
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#166A9E', mt: 2 }} onClick={handleContactClick}>
            Contact {username || 'this tutor'}
          </Button>
        </Box>

        {/* Tutor Information */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Qualifications */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Qualifications</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">{qualifications || 'No qualifications provided'}</Typography>
          </Box>

          {/* Experience */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Experience</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">{experience || 'No experience provided'}</Typography>
          </Box>

          {/* Teaching Style */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Teaching Style</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">{teachingStyle || 'No teaching style provided'}</Typography>
          </Box>

          {/* Performance Metrics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Performance Metrics</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">Average Improvement: {performanceMetrics?.average_improvement || 'N/A'}</Typography>
            <Typography variant="body1">Student Retention: {performanceMetrics?.student_retention || 'N/A'}</Typography>
          </Box>

          {/* Certifications */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Certifications</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {certifications?.length ? (
                certifications.map((cert, index) => (
                  <Chip key={index} label={cert} variant="outlined" />
                ))
              ) : (
                <Typography variant="body1">No certifications provided</Typography>
              )}
            </Box>
          </Box>

          {/* Specialization Areas */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Specialization Areas</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {specializationAreas?.length ? (
                specializationAreas.map((area, index) => (
                  <Chip key={index} label={area} variant="outlined" />
                ))
              ) : (
                <Typography variant="body1">No specialization areas provided</Typography>
              )}
            </Box>
          </Box>

          {/* Availability */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#166A9E' }}>Availability</Typography>
            <Divider sx={{ my: 1 }} />
            {availability ? (
              Object.entries(availability).map(([day, times], index) => (
                <Typography key={index} variant="body1">{day}: {times.join(', ')}</Typography>
              ))
            ) : (
              <Typography variant="body1">No availability provided</Typography>
            )}
            <Typography variant="body2">Time Zone: {availabilityTimeZone || 'N/A'}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Contact Modal */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', width: 400, mx: 'auto', mt: '10%' }}>
          <Typography variant="h6">Request a Session with {username}</Typography>
          <TextField
            label="Your message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSendRequest}>
            Send Request
          </Button>
        </Box>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Request sent successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      {sessionRequestError && (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleErrorSnackbarClose}>
          <Alert onClose={handleErrorSnackbarClose} severity="error">
            {sessionRequestError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
