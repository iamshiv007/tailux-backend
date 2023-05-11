const Address = require("../models/address")

exports.newAddress = (req, res) => {
    const userId = req.user._id
    const { ...data } = req.body

    Address.create({ ...data, user: userId })
        .then((address) => res.status(201).json({ success: true, address }))
        .catch((err) => res.status(500).json(err))
}