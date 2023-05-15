const Cart = require('../models/cart')

// 1. Add to cart
exports.addToCart = (req, res) => {
    Cart.create(req.body)
        .then((cart) => res.stattus(201).json({ success: true, cart }))
        .catch((err) => res.status(500).json({ succes: false, err }))
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



