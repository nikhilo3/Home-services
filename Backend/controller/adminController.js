// const express = require('express');
// const Order = require('../models/orderModel');

// const router = express.Router();

// router.get('/order', async (req, res) => {
//     try {
//         const cartItems = await Order.find();
//         res.json(cartItems);
//     } catch (err) {
//         console.log("cannot get order", err);
//         res.status(500).json({ message: 'internal server error' });
//     }
// });