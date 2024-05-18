const mongoose = require('mongoose');

// Define Rating and Review Schema
const ratingReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    
  },
  service: {
    type: String,
    required: true
  },
  starRating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  improvements: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Rating and Review Model
const RatingReview = mongoose.model('RatingReview', ratingReviewSchema);

module.exports = RatingReview;
