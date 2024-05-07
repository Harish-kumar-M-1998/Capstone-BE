const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cleaningservices = require('../models/cleaningservicelist');

const fs = require('fs');



const createUploadsDir = () => {
  const uploadDir = 'uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
};

// Middleware to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      createUploadsDir(); // Ensure upload directory exists
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + path.extname(file.originalname));
    }
  })
});

// Route to add a new cleaning service
router.post('/addCleaningService', upload.single('image'), async (req, res) => {
  try {
    const { name, availability, price, location, description } = req.body;
    const image = req.file ? req.file.path : null; // Save the file path if uploaded
    console.log(image)
    const newCleaningService = new cleaningservices({
      name,
      availability,
      price,
      location,
      image,
      description
    });

    const savedCleaningService = await newCleaningService.save();
    res.json(savedCleaningService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to get all cleaning services
router.get('/getAllCleaningServices', async (req, res) => {
    
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
     

module.exports = router;
