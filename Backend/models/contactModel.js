const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    conname:{
        type:String,
        required:true
    },
    conmail:{
        type: String,
        required:true
    },
    conphone:{
        type:String,
        required:true
    },
    condetail:{
        type:String,
        required:true
    },
},{collection:'contactus'});

const Contact = mongoose.model('contactus',contactSchema);

module.exports = Contact;