const express = require('express');
const router = express.Router();
const cleaningmodel = require('../models/cleaningservicelist');

// Route to get all cleaning services
router.get('/getAllCleaningServices', async (req, res) => {
    
       cleaningmodel.find()
       .then (cleaningservices => res.json(cleaningservices))
       .catch( err => res.json(err))
     
});
router.get('/getCleaningServiceById/:serviceid', async (req, res) => {
       const serviceid = req.params.serviceid; // Access service ID from URL parameters
     
       // Use findOne instead of find since you're fetching a single document by ID
       cleaningmodel.findOne({ _id: serviceid })
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
