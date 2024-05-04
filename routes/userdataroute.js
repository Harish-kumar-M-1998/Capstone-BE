const express = require('express');
const UserData = require('../models/userdata');

const router = express.Router();

router.post('/userdata', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, cleaningType, inContract, identity, help, blog } = req.body;

    try {
        // Create a new user data instance
        const newUserData = new UserData({
            firstName,
            lastName,
            email,
            phoneNumber,
            cleaningType, // Added field
            inContract,   // Added field
            identity,     // Added field
            help,
            blog
        });

        // Save the user data to the database
        await newUserData.save();

        res.json({ status: true, message: 'User data saved successfully' });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
