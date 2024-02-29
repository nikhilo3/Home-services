// login.js
const express = require('express');
const router = express.Router();
const Registration = require('../models/regiModel');
const { generateToken } = require('../config/jwtToken');


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Registration.findOne({ email: email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        console.log('Login successful', token);
        
        return res.json({
            _id : user._id,
            username : user.username,
            email : user.email,
            password : user.password,
            token : token,
        });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;