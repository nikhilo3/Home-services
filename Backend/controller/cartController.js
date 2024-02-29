const express = require('express');
const Cart = require('../models/cartModel');
<<<<<<< HEAD

router.post('/addtocart', async (req, res) => {
=======
const User = require('../models/regiModel');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();

router.post('/addtocart', verifyToken, async (req, res) => {
>>>>>>> 6df9e7d683bd0ddfbaa99de90a58ee9886c04d63
    try {

        const { id, title, price, image, quantity } = req.body;

        const { _id } = req.user;

        try {
            const user = await User.findById(_id);
            console.log(user)
            const cartItem = new Cart({
                user: user._id,
                id: id,
                title: title,
                price: price,
                image: image,
                quantity: quantity
            });

            await cartItem.save();
            res.json(cartItem);

        } catch (error) {
            throw new Error('error')
        }




        //     const cartItem = new Cart({
        //         user: userId,
        //         id: id,
        //         title: title,
        //         price: price,
        //         image: image,
        //         quantity: quantity
        //     });

        //     await cartItem.save();
        //     res.status(200).send({ message: 'Item added to cart successfully' });
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: 'Unauthorized' });

        // console.error('Error adding item to cart:', err);
        // res.status(500).json({ message: 'Internal server error' });
    }
});

<<<<<<< HEAD
router.get('/getcartitems', async (req, res) => {
=======
router.get('/getcartitems', verifyToken, async (req, res) => {
>>>>>>> 6df9e7d683bd0ddfbaa99de90a58ee9886c04d63
    try {
        // const token = req.headers.authorization;
        const { _id } = req.user;
        try {
            const cartItems = await Cart.find({ user: _id });
            res.json(cartItems);
        } catch (error) {
            throw new Error('error');
        }
    } catch (err) {
        console.error('Error fetching cart items', err);
        res.status(500).json({ message: 'internal server error' });
    }
});

router.delete('/removefromcart/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await Cart.findByIdAndDelete(itemId);
        res.status(200).send({ message: 'Item Remove From Cart Successfully' });
    } catch (err) {
        console.error('Error removing item from cart', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;