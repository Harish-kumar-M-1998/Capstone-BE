const mongoose = require('mongoose');

// Define the schema for the quote request
const quoteRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening']
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the quote request schema
const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);

module.exports = QuoteRequest;
