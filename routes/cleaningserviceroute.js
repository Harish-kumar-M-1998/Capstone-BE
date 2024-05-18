const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cleaningservices = require('../models/cleaningservicelist');
const verifyToken = require('../middleware/index');
const fs = require('fs');



router.post('/addCleaningService', verifyToken,async (req, res) => {
  try {
    const { name, availability, price, location, image, description } = req.body;

    // Create a new cleaning service document
    const newCleaningService = new cleaningservices({
      name,
      availability,
      price,
      location,
      image,
      description
    });

    // Save the cleaning service to the database
    const savedCleaningService = await newCleaningService.save();

    // Respond with the saved cleaning service
    res.json(savedCleaningService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to get all cleaning services
router.get('/getAllCleaningServices',verifyToken, async (req, res) => {
    
  cleaningservices.find()
       .then (cleaningservices => res.json(cleaningservices))
       .catch( err => res.json(err))
     
});
router.get('/getCleaningServiceById/:serviceid', async (req, res) => {
       const serviceid = req.params.serviceid; // Access service ID from URL parameters
     
       // Use findOne instead of find since you're fetching a single document by ID
       cleaningservices.findOne({ _id: serviceid })
         .then(cleaningservice => {
           if (!cleaningservice) {
             // If no service found with the given ID, return 404 Not Found
             return res.status(404).json({ error: 'Service not found' });
           }
           res.json(cleaningservice); // Return the found service
         })
         .catch(err => {
           console.error(err);
           res.status(500).json({ error: 'Internal server error' }); // Handle errors
         });
     });

     router.delete('/:id',verifyToken, async (req, res) => {
      try {
        const service = await cleaningservices.findById(req.params.id);
        if (service == null) {
          return res.status(404).json({ message: 'Service not found' });
        }
        await cleaningservices.findByIdAndDelete(req.params.id); // Corrected line
        res.json({ message: 'Service deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    router.put('/:id',verifyToken, async (req, res) => {
      try {
        const service = await cleaningservices.findById(req.params.id);
        if (!service) {
          return res.status(404).json({ error: 'Service not found' });
        }
    
        // Update service fields based on request body
        if (req.body.name) {
          service.name = req.body.name;
        }
        if (req.body.description) {
          service.description = req.body.description;
        }
        if (req.body.price) {
          service.price = req.body.price;
        }
    
        // Validate and save the updated service
        const updatedService = await service.save();
        res.json({ message: 'Service updated successfully', service: updatedService });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

module.exports = router;
