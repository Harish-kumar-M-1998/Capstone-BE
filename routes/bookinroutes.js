const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51PDekiSGfzm40G055NL7Jb84b6YnfiYhI1OOFXGHOERX7lEkgEprTzxX4OW4J9D7fkN0RNykkucCYoeE4PIMMnkw00kBDaN4qB');
const Booking = require('../models/booking');
const CleaningService = require('../models/cleaningservicelist');
const verifyToken = require('../middleware/index');
router.post('/bookings', verifyToken, async (req, res) => {
    try {
        const {
            username,
            serviceType,
            serviceId,
            serviceDate,
            totalAmount,
            transactionId,
            status
        } = req.body;

        const newDate = new Date(serviceDate);
        const formattedDate = newDate.toISOString();

        const newBooking = new Booking({
            username,
            serviceType,
            serviceId,
            serviceDate: formattedDate,
            totalAmount,
            transactionId,
            status
        });

        await newBooking.save();

        await CleaningService.findByIdAndUpdate(serviceId, {
            $push: {
                currentBookings: {
                    bookingId: newBooking._id,
                    userId: newBooking.username,
                    date: newBooking.serviceDate,
                    status: newBooking.status
                }
            }
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'INR',
            payment_method_types: ['card'],
            description: `Booking payment for ${serviceType}`
        });

        res.status(201).json({ 
            message: 'Booking successful! Your booking details have been saved.',
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
});

router.get('/bookings', verifyToken, async (req, res) => {
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
        const existingBookings = await Booking.find({ serviceId, serviceDate });
        res.json(existingBookings);
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Error checking availability' });
    }
});
router.post('/username', async (req, res) => {
    try {
        const { username } = req.body;
        const bookings = await Booking.find({ username });
        res.json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings by username:', error);
        res.status(500).json({ error: 'Error retrieving bookings by username' });
    }
});

router.delete('/:bookingId', verifyToken, async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      // Delete booking from the database
      await Booking.findByIdAndDelete(bookingId);
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const username = req.query.username; // Get the username from the query string
      const userBookings = await Booking.find({ username: username });
      res.status(200).json(userBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Check if the booking exists
      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Update the booking status
      booking.status = status;
      await booking.save();
  
      res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
module.exports = router;
