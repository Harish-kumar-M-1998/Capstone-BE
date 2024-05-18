const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/index');

// Protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

module.exports = router;
