const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student, Tutor } = require('../models/models'); // Ensure the correct path to your models

const router = express.Router();

const JWT_SECRET = 'fdjhfkldhs';

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Student registration
router.post('/register/student', async (req, res) => {
  const { email, password, learningGoals, currentLevel, preferredTutorAttributes } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      email,
      password: hashedPassword,
      learningGoals,
      currentLevel,
      preferredTutorAttributes,
    });

    await student.save();

    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, student });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/register/tutor', async (req, res) => {
  const { email, password, subjects, availability, rating, experience, qualifications } = req.body;

  try {
    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tutor = new Tutor({
      email,
      password: hashedPassword,
      subjects,
      availability,
      rating,
      experience,
      qualifications,
    });

    await tutor.save();

    const token = jwt.sign({ id: tutor._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, tutor });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ error: error.message });
  }
});
router.post('/login/student', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!student.password) {
      return res.status(400).json({ error: 'Password field is missing' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, student });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login/tutor', async (req, res) => {
  const { email, password } = req.body;

  try {
    const tutor = await Tutor.findOne({ email });
    if (!tutor) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!tutor.password) {
      return res.status(400).json({ error: 'Password field is missing' });
    }

    const isMatch = await bcrypt.compare(password, tutor.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: tutor._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, tutor });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
