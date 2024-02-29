const express = require('express');
const Registration = require('../models/regiModel');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log("register receive data", req.body);

        const existingUser = await Registration.findOne({ email: req.body.email });

        if (existingUser) {
            // Email already exists, return an error response
            return res.status(400).send({ message: 'Email address is already registered.' });
        }

        const registration = new Registration({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await registration.save();

        console.log("User registered successfully:", registration);
        res.status(200).send(registration);


    } catch (err) {
        console.log("error registerd user", err);
        res.status(500).send({ message: 'Could not add order to database', err })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Registration.findOne({ email: email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;