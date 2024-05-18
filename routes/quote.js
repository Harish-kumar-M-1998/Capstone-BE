const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/quote');
const verifyToken = require('../middleware');

// Route to create a new quote request
router.post('/quote',verifyToken, async (req, res) => {
  try {
    const quoteRequest = new QuoteRequest(req.body);
    await quoteRequest.save();
    res.status(201).send(quoteRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all quote requests
router.get('/quote',verifyToken, async (req, res) => {
  try {
    const quoteRequests = await QuoteRequest.find();
    res.send(quoteRequests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a specific quote request by ID
router.get('/quote/:id', async (req, res) => {
  try {
    const quoteRequest = await QuoteRequest.findById(req.params.id);
    if (!quoteRequest) {
      return res.status(404).send();
    }
    res.send(quoteRequest);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a specific quote request by ID
router.patch('/quote/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'phone', 'service', 'availability', 'date'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const quoteRequest = await QuoteRequest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quoteRequest) {
      return res.status(404).send();
    }
    res.send(quoteRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a specific quote request by ID
router.delete('/quote/:id', async (req, res) => {
  try {
    const quoteRequest = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quoteRequest) {
      return res.status(404).send();
    }
    res.send(quoteRequest);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
