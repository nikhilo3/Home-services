const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
// const moment = require('moment');

router.post('/', async (req, res) => {
    try {
        console.log('Received Data:', req.body);

        const order = new Order({
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

        // Format the appointment date using moment.js
        // let formattedAppointmentDate = moment(order.appointmentDate).format('YYYY-MM-DD');
        // console.log(formattedAppointmentDate); // Output: 2024-01-25


        await order.save();
        res.status(200).send(order);
    }
    catch (error) {
        console.error('Error adding order to database:', error);
        res.status(500).send({ message: 'Could not add order to database', error });
    }
});

module.exports = router;