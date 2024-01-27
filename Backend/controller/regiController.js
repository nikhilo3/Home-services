const express = require('express');
const Registration = require('../models/regiModel');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log("regiuser receive data",req.body);

        const registration = new Registration({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });
        await registration.save();
        res.status(200).send(registration);
    } catch (err) {
        console.log("error registerd user", err);
        res.status(500).send({ message: 'Could not add order to database', err })
    }
});

module.exports = router;