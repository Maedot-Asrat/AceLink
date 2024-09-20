const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// POST route to reply to a message
router.post('/reply', async (req, res) => {
  const { content, sender, parentMessageId } = req.body;

  try {
    // Create a new reply message
    const reply = new Message({
      content,
      sender
    });
    const savedReply = await reply.save();

    // Update the parent message with the new reply's ID
    await Message.findByIdAndUpdate(parentMessageId, {
      $push: { replies: savedReply._id }
    });

    // Populate sender and replies data
    const populatedReply = await savedReply.populate('replies sender').execPopulate();

    // Return the saved reply
    res.json(populatedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch all messages with replies
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('replies') // Populate replies
      .exec();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch a specific message by ID
router.get('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('replies sender') // Populate sender and replies
      .exec();
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE route to delete a specific message by ID
router.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.remove(); // Delete the message

    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE route to delete all messages
router.delete('/messages', async (req, res) => {
  try {
    await Message.deleteMany(); // Delete all messages
    res.json({ message: 'All messages deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
