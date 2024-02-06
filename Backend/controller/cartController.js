const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const { authenticateToken } = require('../auth');

router.post('/addtocart', authenticateToken, async (req, res) => {
    try {
        const { id, title, price, image, quantity } = req.body;

        const userId = req.user.userId;

        const cartItem = new Cart({
            user: userId,
            id: id,
            title: title,
            price: price,
            image: image,
            quantity: quantity
        });

        await cartItem.save();
        res.status(200).send({ message: 'Item added to cart successfully' });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getcartitems', authenticateToken, async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).send(cartItems);
    } catch (err) {
        console.error('Error fetching cart items', err);
        res.status(500).json({ message: 'internal server error' });
    }
});

router.delete('/removefromcart/:id', authenticateToken ,async (req, res) => {
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