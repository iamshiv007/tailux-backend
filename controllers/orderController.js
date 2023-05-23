const { asyncError, errorHandler } = require('../middleware/error')
const Order = require('../models/order')

// 1. Create New Order
exports.newOrder = asyncError(async (req, res) => {

    const userId = req.user._id

    const order = await Order.create({ ...req.body, user: userId })

    res.status(201).json({ success: true, message: "Order Created", order })

})

// 2. Get User Orders
exports.getUserOrders = asyncError(async (req, res) => {

    const orders = await Order.find({ user: req.user._id })
        .populate("user")
        .populate("products.product")
        .populate("shippingInfo")

    res.status(200).json({ success: true, orders })

})

exports.updateOrder = asyncError(async (req, res) => {

    const { id } = req.params

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body)

    if (!updatedOrder)
        return errorHandler(res, 404, 'Order Not Found')

    res.status(200).json({ success: true, message: "Order Updated" })
})

exports.deleteOrder = asyncError(async (req, res) => {

    const { id } = req.params

    const deletedOrder = await Order.findByIdAndDelete(id)

    if (!deletedOrder)
        return errorHandler(res, 404, 'Order Not Found')

    res.status(200).json({ success: true, message: "Order Deleted" })

})