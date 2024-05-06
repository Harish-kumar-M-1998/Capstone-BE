const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

// Create a new checklist
router.post('/checklists', async (req, res) => {
  try {
    const checklist = new Checklist(req.body);
    await checklist.save();
    res.status(200).send(checklist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all checklists
router.get('/checklists', async (req, res) => {
  try {
    const checklists = await Checklist.find();
    res.send(checklists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single checklist by ID
router.get('/checklists/:id', async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist) {
      return res.status(404).send();
    }
    res.send(checklist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a checklist by ID
router.put('/checklists/:id', async (req, res) => {
  try {
    const checklist = await Checklist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!checklist) {
      return res.status(404).send();
    }
    res.send(checklist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a checklist by ID
router.delete('/checklists/:id', async (req, res) => {
  try {
    const checklist = await Checklist.findByIdAndDelete(req.params.id);
    if (!checklist) {
      return res.status(404).send();
    }
    res.send(checklist);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
