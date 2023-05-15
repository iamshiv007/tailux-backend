const Order = require('../models/order')

// 1. Create New Order
exports.newOrder = (req, res) => {
    Order.create(req.body)
        .then((order) => res.status(201).json({ success: true, order }))
        .catch((err) => res.status(500).json({ success: false, err }))
}

// 2. Get User Orders
exports.getUserOrders = (req, res) => {
    Order.find({ user: req.user._id })
        .populate("user")
        .populate("product")
        .populate("shippingInfo")
        .then((orders) => res.status(200).json({ success: true, orders }))
        .catch((err) => res.status(500).json({ success: false, err }))
}