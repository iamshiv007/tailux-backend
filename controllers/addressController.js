const { asyncError, errorHandler } = require("../middleware/error")
const Address = require("../models/address")

// 1. Create New Address
exports.newAddress = asyncError(async (req, res) => {

    const userId = req.user._id
    const { ...data } = req.body

    const address = await Address.create({ ...data, user: userId })

    res.status(201).json({ success: true, message: "Address created", address })

})

// 2. Get User addresses
exports.getUserAddresses = asyncError(async (req, res) => {

    const addresses = await Address.find({ user: req.user._id })

    res.status(200).json({ success: true, addresses })

})

// 3. Delete A Address
exports.deleteAddress = asyncError(async (req, res) => {

    const address = await Address.findByIdAndDelete(req.params.id)

    if (!address)
        return errorHandler(res, 404, "Address Not Found")

    res.status(200).json({ success: true, message: "Address Deleted" })

})

exports.upadateAddress = asyncError(async (req, res) => {

    const address = await Address.findByIdAndUpdate(req.params.id, req.body)

    if (!address)
        return errorHandler(res, 404, "Address Not Found")

    res.status(200).json({ success: true, message: "Address Updated" })

})