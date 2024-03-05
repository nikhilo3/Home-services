const mongoose = require('mongoose');

const subschema = new mongoose.Schema({
    submail:{
        type:String,
        required:true,
    }
},{collection:'subscribemail'});

module.exports = mongoose.model('subscribemail',subschema);