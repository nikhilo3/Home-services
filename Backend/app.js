const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
// const ejs = require('ejs');


const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Homeservices').then(() => {
    console.log("database connected successfully");
}).catch((err) => {
    console.log('Database connection error:', err);
});


//middleware

// Session middleware configuration
app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for HTTPS
}));
// Flash middleware configuration
app.use(flash());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assest', express.static(path.join(__dirname, '../assest')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/mybooking', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/bookingpage.html'));
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

app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/adminpanel.html'));
});

app.get('/admin/order', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/adminorder.html'));
});

app.get('/admin/sub', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/adminsub.html'));
});

app.get('/admin/user', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/adminuser.html'));
});

app.get('/admin/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/admincontact.html'));
});




// Routes
const orderRouter = require('./controller/orderController');
const cartRouter = require('./controller/cartController');
const regiRouter = require('./controller/regiController');
const subRouter = require('./controller/subController');
const loginRouter = require('./controller/loginControll');
const adminorder = require('./controller/adminController');
const contactRouter = require('./controller/contactController');
const { notFound, errorHandler } = require('./middleware/errorHandling');
const countController = require('./controller/countController');

app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/registration', regiRouter);
app.use('/login', loginRouter);
app.use('/subscribemail', subRouter);
app.use('/adminorder', adminorder);
app.use('/contactus', contactRouter);

app.get('/countdata', async (req,res) => { 
    try {
        const userCount = await countController.getUserCount();
        const orderCount = await countController.getOrderCount();
        const paymentCount = await countController.getPaymentCount();

        console.log("user count",userCount);
        console.log("Order Count: ", orderCount);
        console.log("payment Count: ", paymentCount);


        const data = {
            userCount,
            orderCount,
            paymentCount
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('error fetching data');
    }
})

app.use(notFound);
app.use(errorHandler);


// server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});