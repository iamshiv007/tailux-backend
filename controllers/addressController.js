const Address = require("../models/address")

// 1. Create New Address
exports.newAddress = (req, res) => {
    const userId = req.user._id
    const { ...data } = req.body

    Address.create({ ...data, user: userId })
        .then((address) => res.status(201).json({ success: true, address }))
        .catch((err) => res.status(500).json(err))
}

// 2. Get User addresses
exports.getUserAddresses = (req, res) => {
    Address.find({user:req.user._id})
    .then((addresses) => res.status(200).json({success:true, addresses}))
    .catch((err) => res.status(500).json(err))
}

