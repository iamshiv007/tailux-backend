const CustomProduct = require('../models/customProduct')
const { asyncError, errorHandler } = require("../middleware/error")

// 1. Create custom product
exports.createCustomProduct = asyncError(async (req, res) => {

    const user = req.user._id

    await CustomProduct.create({ ...req.body, user })

    res.status(201).json({ success: true, message: "Custom Product Created" })
})

// 2. Get user's custom product
exports.userCustomProducts = asyncError(async (req, res) => {

    const user = req.user._id

    const customProducts = await CustomProduct.find({ user }).populate("product").populate("size")

    res.status(200).json({ success: true, customProducts })

})

// 3. Update a product
exports.updateCustomProduct = asyncError(async (req, res) => {


    const customProduct = await CustomProduct.findByIdAndUpdate(req.params.id, req.body)

    if (!customProduct)
        return errorHandler(res, 404, "Custom Product Not found")

    res.status(200).json({ success: true, message: "Custom Product Updated" })
})

// 4. Delete custom product
exports.deleteCustomProduct = asyncError(async (req, res) => {

    const customProduct = await CustomProduct.findByIdAndDelete(req.params.id)

    if (!customProduct)
        return errorHandler(res, 404, "Custom Product Not found")

    res.status(200).json({ success: true, message: "Custom Product Deleted" })
})