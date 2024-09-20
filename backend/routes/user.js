const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const multer = require('multer');
// Route for updating the profile for both students and tutors
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where the profile pictures will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Create a unique filename
  }
});

const upload = multer({ storage: storage });
// Secret key for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for production

// Register User (Student or Tutor)
router.post('/register', async (req, res) => {
    try {
      const { username, password, email, role, ...profile } = req.body;
  
      // Check if user already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the User document
      const user = new User({
        username,
        password: hashedPassword,
        email,
        role
      });
  
      await user.save();
  
      // Create the Student or Tutor document
      if (role === 'Student') {
        const student = new Student({
          username,
          email,
          ...profile
        });
        await student.save();
  
      } else if (role === 'Tutor') {
        const tutor = new Tutor({
          ...profile,  // Other profile-specific fields for Tutor
          username,
          email,
          role
        });
        await tutor.save();
      } else {
        return res.status(400).json({ error: 'Invalid role specified' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      // Fetch the student or tutor object ID
      let profileData;
      let profileId;
  
      if (user.role === 'Student') {
        const studentProfile = await Student.findOne({ email });
        if (studentProfile) {
          profileData = studentProfile.profile;
          profileId = studentProfile._id;
        }
      } else if (user.role === 'Tutor') {
        const tutorProfile = await Tutor.findOne({ email });
        if (tutorProfile) {
          profileData = tutorProfile.profile;
          profileId = tutorProfile._id;
        }
      } else {
        return res.status(400).json({ error: 'Invalid role' });
      }
  
      // Send token and user information with profile data and profile ID
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          profile: profileData,
          profileId: profileId // Include the student/tutor object ID
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  


// Route for updating the profile (with optional profile picture) for both students and tutors
// Route for updating the profile (with optional profile picture and video)
router.patch('/update-profile', upload.fields([
  { name: 'profilePicture', maxCount: 1 }, 
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Received request to update profile');
    
    const { userId } = req.body;
    console.log('User ID:', userId);

    const profile = JSON.parse(req.body.profile);
    console.log('Profile data:', profile);

    // Find the user document by userId
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User found:', user);

    // Handle the profile picture if uploaded
    let profilePictureUrl = null;
    if (req.files && req.files['profilePicture']) {
      profilePictureUrl = req.files['profilePicture'][0].path; // Save the path of the uploaded profile picture
      console.log('Profile picture uploaded:', profilePictureUrl);
    } else {
      console.log('No profile picture uploaded');
    }

    // Handle the video if uploaded
    let videoUrl = null;
    if (req.files && req.files['video']) {
      videoUrl = req.files['video'][0].path; // Save the path of the uploaded video
      console.log('Video uploaded:', videoUrl);
    } else {
      console.log('No video uploaded');
    }

    // Add the profile picture and video URLs to the profile object if they exist
    if (profilePictureUrl) {
      profile.profile_picture = profilePictureUrl;
    }
    if (videoUrl) {
      profile.video = videoUrl;
    }

    let updatedProfile;

    if (user.role === 'Tutor') {
      console.log('Updating profile for role: Tutor');
      // Update tutor profile, including profile picture and video
      updatedProfile = await Tutor.findOneAndUpdate(
        { email: user.email },  // Find tutor by the email associated with the user
        {
          $set: { profile }
        },
        { new: true, runValidators: true }
      );
    } else if (user.role === 'Student') {
      console.log('Updating profile for role: Student');
      // Update student profile, including profile picture (students might not have a video)
      updatedProfile = await Student.findOneAndUpdate(
        { email: user.email },  // Find student by the email associated with the user
        {
          $set: { profile }
        },
        { new: true, runValidators: true }
      );
    } else {
      console.error('Invalid role:', user.role);
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!updatedProfile) {
      console.error('Profile not found or failed to update');
      return res.status(404).json({ error: 'Profile not found' });
    }

    console.log('Profile updated successfully:', updatedProfile);
    res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(400).json({ error: err.message });
  }
});
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    console.log('Received request to get profile for Tutor ID:', tutorId);

    // Find the tutor by their ID
    const tutor = await Tutor.findById(tutorId).populate('requests'); // Populating requests if needed

    if (!tutor) {
      console.error('Tutor not found');
      return res.status(404).json({ error: 'Tutor not found' });
    }

    console.log('Tutor profile found:', tutor);
    res.status(200).json({ tutor });
  } catch (err) {
    console.error('Error fetching tutor profile:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  router.get('/get-tutors', async (req, res) => {
    try {
      // Fetch all tutors from the database
      const tutors = await Tutor.find({});
  
      // If no tutors are found, return a 404 response
      if (tutors.length === 0) {
        return res.status(404).json({ message: 'No tutors found' });
      }
  
      // Return the list of tutors
      res.status(200).json({ tutors });
    } catch (err) {
      console.error('Error fetching tutors:', err.message || err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  });
  // Search tutor by partial username (case-insensitive)
router.get('/tutor/search/:username', async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Received request to search tutor by partial username:', username);

    // Use a case-insensitive regex to find tutors whose usernames contain the search term
    const tutors = await Tutor.find({ username: { $regex: username, $options: 'i' }}).populate('requests');

    if (!tutors || tutors.length === 0) {
      return res.status(404).json({ error: 'No tutors found' });
    }

    console.log('Tutors found:', tutors);
    res.status(200).json({ tutors });
  } catch (err) {
    console.error('Error searching tutors by username:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;


