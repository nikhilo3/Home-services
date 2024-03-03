const express = require('express');
const Registration = require('../models/regiModel');
// const asyncHandler = require('express-async-handler');
// const { generateToken } = require('../config/jwtToken');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("register receive data", req.body);

        const existingUser = await Registration.findOne({ email });

        if (existingUser) {
            // Email already exists, return an error response
            return res.status(400).send({ message: 'user is already registered.' });
            // throw new Error("user already exist")
        }

        const user = new Registration({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        console.log("User registered successfully:", user);
        res.status(201).send({ message: 'User registered successfully',user });

    } catch (err) {
        console.log("error registerd user", err);
        res.status(500).send({ message: 'Internal server error' })
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if the user exists
//         const user = await Registration.findOne({ email: email });

//         if (!user || user.password !== password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = generateToken(user._id);

//         // res.status(200).json({ message: 'Login successful', token });

//         res.status(200).redirect('http://127.0.0.1:5501/index.html');
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


module.exports = router;