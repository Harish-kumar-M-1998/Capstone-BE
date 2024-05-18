// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const router = express.Router();

const verifyToken = require('../middleware/index');

// Import User model
const User = require('../models/user');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false // Set isAdmin to false by default for new users
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'jwttoken', { expiresIn: '1h' });

    // Send success response along with JWT token
    res.status(200).json({ 
      token,
      isAdmin: user.isAdmin,
      _id: user._id,
      username: user.username,
      email: user.email
      // Add any other user information you need here
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:userId', verifyToken,async (req, res) => {
  try {
    const userId = req.params.userId;
    // Update user's role to admin
    await User.findByIdAndUpdate(userId, { isAdmin: true });
    res.status(200).json({ message: 'User updated to admin successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user
router.delete('/:userId', verifyToken,async (req, res) => {
  try {
    const userId = req.params.userId;
    // Delete user from the database
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});













module.exports = router;
