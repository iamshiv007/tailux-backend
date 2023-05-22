const { asyncError } = require('../middleware/error')
const Cart = require('../models/cart')

// 1. Add to cart
exports.addToCart = asyncError((req, res) => {

    const userId = req.user._id

    Cart.create({ ...req.body, user: userId })
        .then((cart) => res.status(201).json({ success: true, cart }))
        .catch((err) => res.status(500).json({ success: false, err }))
})

// 2. Get User Cart List
exports.getUserCartItems = asyncError(async (req, res) => {

    const cartItems = await Cart.find({ user: req.user._id })
        .populate("user")
        .populate("product")

    res.status(200).json({ success: true, cartItems })

})

// 3. Remove Item from Cart List
exports.removeCartItem = asyncError(async (req, res) => {

    const cartItem = await Cart.findByIdAndDelete(req.params.id)
    if (!cartItem)
        return errorHandler(res, 404, "CartItem Not Found")

    res.status(200).json({ success: true, message: "Cart Item Deleted" })

})

