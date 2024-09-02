const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

module.exports = function (io) {
  // Handle new connections
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (data) => {
      const { senderId, receiverId, content } = data;

      // Create a new message document
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content
      });

      // Save the message to the database
      await message.save();

      // Emit the message to the receiver
      io.to(receiverId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return router;
};
