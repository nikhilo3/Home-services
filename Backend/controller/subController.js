const subscribemail = require('../models/subModel');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    try {


        const submail = new subscribemail({
            submail: req.body.submail
        });

        await submail.save();

        console.log('subscribe successfully');
        res.status(200).send(submail);
    } catch (error) {
        console.log('error while subscribe mail', error);
    }
});

module.exports = router;