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

// 3. Delete A Address
exports.deleteAddress = async(req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id)
        if(!address)
        return res.status(404).json({success:false, error:"Address Not Found"})

        res.status(200).json({success:true, message:"Address Deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.upadateAddress = async(req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body) 
        if(!address)
        return res.status(404).json({success:false, error:"Address Not Found"})

        res.status(200).json({success:true, message:"Address Updated"})
    } catch (error) {
        res.status(500).json(error)
    }
}