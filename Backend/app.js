const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Homeservices').then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(err);
});



//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const {authenticateToken,jwtSecret} = require('./auth');

app.use((req,res,next)=>{
    req.jwtSecret = jwtSecret;
    next();
})


// Routes
const orderRouter = require('./controller/orderController');
const cartRouter = require('./controller/cartController');
const regiRouter = require('./controller/regiController');

app.use('/order',orderRouter);
app.use('/cart',cartRouter);
app.use('/registration',regiRouter);

// server
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
