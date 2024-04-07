const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const User = require('../models/regiModel');
// const Order = require('../models/orderModel');
const verifyToken = require('../middleware/verifyToken');




router.post('/', verifyToken,async (req, res) => {
    try {
        console.log('Received Data:', req.body);

        const { _id } = req.user;

        const user = await User.findById(_id);
        // console.log(user._id);

        const order = new Order({
            user:user._id,
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            emailAddress: req.body.emailAddress,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            paytotal: req.body.paytotal
        });


        await order.save();
        // res.status(200).send({ message: "order palced successfull" });
        console.log(order);
        
        res.render('../views/popup.ejs',{orderId:user._id});
        // res.redirect("/viewconfirm");
        console.log("redirected");
    }
    catch (error) {
        console.error('Error adding order to database:', error);
        res.status(500).send({ message: 'Could not add order to database', error });
    }
});


router.get('/getorder', verifyToken, async (req, res) => {
    try {
        const { _id } = req.user;
        try {
            const orderItem = await Order.find({ user: _id });
            res.json(orderItem);
        } catch (error) {
            throw new Error('error');
        }
    } catch (err) {
        console.error('Error fetching cart items', err);
        res.status(500).json({ message: 'internal server error' });
    }
});

module.exports = router;