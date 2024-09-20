const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User with that email does not exist.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set token and expiration time (e.g., 1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    // Save updated user object
    await user.save();

    // Set up nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: 'ijyk umtr qvwb uoqn',      // App Password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender's email
      to: user.email,                   // Recipient's email
      subject: 'Password Reset Request',
      text: `Please click the link to reset your password: ${process.env.CLIENT_URL}/pass/reset-password/${resetToken}`, // Fallback for clients that don't support HTML emails
      html: `
        <p>Please click the link below to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/pass/reset-password/${resetToken}">
          Reset Password
        </a>
        <p>If the link doesn't work, copy and paste this URL into your browser:</p>
        <p>${process.env.CLIENT_URL}/pass/reset-password/${resetToken}</p>
      `
    };
    

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Error in forgot-password route:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
