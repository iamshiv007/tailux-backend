const { asyncError } = require('../middleware/error')
const Order = require('../models/order')

// 1. Create New Order
exports.newOrder = asyncError((req, res) => {
    const userId = req.user._id

    Order.create({ ...req.body, user: userId })
        .then((order) => res.status(201).json({ success: true, order }))
        .catch((error) => res.status(500).json({ success: false, error }))
})

// 2. Get User Orders
exports.getUserOrders = asyncError((req, res) => {
    Order.find({ user: req.user._id })
        .populate("user")
        .populate("product")
        .populate("shippingInfo")
        .then((orders) => res.status(200).json({ success: true, orders }))
        .catch((error) => res.status(500).json({ success: false, error }))
})