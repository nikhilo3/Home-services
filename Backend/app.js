const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Homeservices').then(() => {
    console.log("database connected successfully");
}).catch((err) => {
    console.log('Database connection error:', err);
});


//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '../public')));
app.use('/assest', express.static(path.join(__dirname, '../assest')));



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/checkout', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/checkout.html'));
});

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/mybooking', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/mybooking.html'));
});

app.get('/mycart', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/mycart.html'));
});

app.get('/service', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/service.html'));
});

app.get('/servicedetail', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/servicedetail.html'));
});


// Routes
const orderRouter = require('./controller/orderController');
const cartRouter = require('./controller/cartController');
const regiRouter = require('./controller/regiController');
const subRouter = require('./controller/subController');
const loginRouter = require('./controller/loginControll');
const { notFound, errorHandler } = require('./middleware/errorHandling');

app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/registration', regiRouter);
app.use('/login', loginRouter);
app.use('/subscribemail', subRouter);


app.use(notFound);
app.use(errorHandler);


// server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
