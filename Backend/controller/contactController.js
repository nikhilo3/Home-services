const Contact = require('../models/contactModel');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const { conname, conmail, conphone, condetail } = req.body;

        const contactuser = new Contact({
            conname:conname,
            conmail:conmail,
            conphone:conphone,
            condetail:condetail
        });

        await contactuser.save();

        console.log('subscribe successfully');
        return res.status(200).json(contactuser);
    } catch (error) {
        console.log('error while subscribe mail', error);
        res.status(500).json(error);
    }
});

module.exports = router;