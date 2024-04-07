const express = require('express');
const Order = require('../models/orderModel');
const Subscribe = require('../models/subModel');
const User = require('../models/regiModel');
const Contact = require('../models/contactModel');

const router = express.Router();

router.get('/order', async (req, res) => {
    try {
        const cartItems = await Order.find();
        res.json(cartItems);
    } catch (err) {
        console.log("cannot get order", err);
        res.status(500).json({ message: 'internal server error' });
    }
});

router.get('/sub', async (req, res) => {
    try {
        const subItems = await Subscribe.find();
        res.json(subItems);
    } catch (err) {
        console.log("cannot get subscribe mail", err);
        res.status(500).json({ message: 'internal server error' });
    }
});


router.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.log("cannot get user detail", err);
        res.status(500).json({ message: 'internal server error' });
    }
});

router.get('/contact', async (req, res) => {
    try {
        const contact = await Contact.find();
        res.json(contact);
    } catch (err) {
        console.log("cannot get contact detail", err);
        res.status(500).json({ message: 'internal server error' });
    }
});


module.exports = router;