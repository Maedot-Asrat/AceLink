const express = require('express');
const router = express.Router();
const multer = require('multer');
const Library = require('../models/Library');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to add a new library item
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), async (req, res) => {
  try {
    const newLibraryItem = new Library({
      title: req.body.title,
      description: req.body.description,
      image: req.files['image'] ? req.files['image'][0].path : '',
      file: req.files['file'] ? req.files['file'][0].path : '',
    });

    const savedLibraryItem = await newLibraryItem.save();
    res.status(201).json(savedLibraryItem);
  } catch (err) {
    console.error('Error saving library item:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to retrieve all library items
router.get('/', async (req, res) => {
  try {
    const libraryItems = await Library.find();
    res.status(200).json(libraryItems);
  } catch (err) {
    console.error('Error fetching library items:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
