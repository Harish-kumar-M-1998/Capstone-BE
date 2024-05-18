// routes/ratingReview.js

const express = require ('express');
const router = express.Router();
const RatingReview = require('../models/rating&review');
const verifyToken = require('../middleware/index');
// Route to submit a new rating and review
router.post('/rating',verifyToken, async (req, res) => {
  try {
    const { name, email, service, starRating, review, improvements } = req.body;

    // Create a new rating and review document
    const newRatingReview = new RatingReview({
      name,
      email,
      service,
      starRating,
      review,
      improvements
    });

    // Save the new rating and review to the database
    await newRatingReview.save();

    res.status(201).json({ message: 'Rating and review submitted successfully', ratingReview: newRatingReview });
  } catch (error) {
    console.error('Error submitting rating and review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch all rating and reviews
router.get('/all',verifyToken, async (req, res) => {
  try {
    // Fetch all rating and reviews from the database
    const ratingReviews = await RatingReview.find();
    res.json(ratingReviews);
  } catch (error) {
    console.error('Error fetching rating and reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes for retrieving, updating, or deleting ratings and reviews could be added here

module.exports = router;
