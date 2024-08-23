// routes/course.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Courses');
const Tutor = require('../models/Tutor');

// Create a new course and reference a tutor
router.post('/', async (req, res) => {
    const { title, description, video, tutor } = req.body;

    try {
        // Check if tutor exists
        const existingTutor = await Tutor.findById(tutor);
        if (!existingTutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        const newCourse = new Course({
            title,
            description,
            video,
            tutor
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all courses (populate tutor details)
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('tutor', 'name email bio');
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a specific course (populate tutor details)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('tutor', 'name email bio');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a course (keep the tutor reference)
router.put('/:id', async (req, res) => {
    const { title, description, video } = req.body;

    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.video = video || course.video;

        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a course
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.remove();
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
