// login.js
const express = require('express');
const router = express.Router();
const Registration = require('../models/regiModel');
const { generateToken } = require('../config/jwtToken');
// const http = require('http');
const cookieParser = require('cookie-parser');

router.use(cookieParser());


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
        
        const cookieOptions = {
            httpOnly: true,
            secure: false,   
            maxAge: 1000 * 60 * 60 * 24 * 3, 
          };
        
        
        res.cookie("auth_token",token,cookieOptions);
        
        console.log("Cookie set");
        return res.send({
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