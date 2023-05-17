const Cart = require('../models/cart')

// 1. Add to cart
exports.addToCart = (req, res) => {
    Cart.create(req.body)
        .then((cart) => res.status(201).json({ success: true, cart }))
        .catch((err) => res.status(500).json({ success: false, err }))
}

// 2. Get User Cart List
exports.getUserCartItems = (req, res) => {
    Cart.find({ user: req.user._id })
        .populate("user")
        .populate("product")
        .then((cartItems) => {
            res.status(200).json({ success: true, cartItems });
        })
        .catch((err) => {
            res.status(500).json({ success: false, err });
        });
}

// 3. Remove Item from Cart List
exports.removeCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id)
        if (!cartItem) {
            res.status(400).json({ success: false, message: "CartItem Not Found" })
        }
        res.status(200).json({ success: true, message: "Cart Item Deleted" })

    } catch (error) {
        (err) => res.status(500).send({ success: false, err })
    }
}

