// bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Import the Booking model
const CleaningService = require ('../models/cleaningservicelist');
// Route for creating a new booking
router.post('/bookings', async (req, res) => {
    try {
        const {
            username,
            serviceType,
            serviceId,
            serviceDate,
            totalAmount,
            transactionId,
            status // Include status in the request body
        } = req.body;

        const newDate = new Date(serviceDate);
        const formattedDate = newDate.toISOString();

        // Create a new booking instance
        const newBooking = new Booking({
            username,
            serviceType,
            serviceId,
            serviceDate: formattedDate,
            totalAmount,
            transactionId,
            status
        });

        // Save the booking to the database
        await newBooking.save();

        // Update the current bookings in the cleaning service model
        await CleaningService.findByIdAndUpdate(serviceId, {
            $push: {
                currentBookings: {
                    bookingId: newBooking._id, // Assign the booking ID
                    userId: newBooking.username, // Assign the user ID
                    date: newBooking.serviceDate, // Assign the service date
                    status: newBooking.status // Assign the status
                }
            }
        });

        res.status(201).json(newBooking); // Respond with the created booking
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
});


// Route for retrieving all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ error: 'Error retrieving bookings' });
    }
});
router.get('/bookings/checkAvailability', async (req, res) => {
    try {
        const { serviceId, serviceDate } = req.query;

        // Query the database to check if there are any existing bookings for the service and date
        const existingBookings = await Booking.find({ serviceId, serviceDate });

        res.json(existingBookings);
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Error checking availability' });
    }
});
module.exports = router;
