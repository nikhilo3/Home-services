const mongoose = require('mongoose');

const regiSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique : true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{collection:'registration'});

const Registration = mongoose.model('Registartion',regiSchema);

module.exports = Registration;