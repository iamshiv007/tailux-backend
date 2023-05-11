const Size = require('../models/size')

// 1. Create New Size
exports.newSize = (req, res) => {
    const { ...data } = req.body
    const userId = req.user._id

    Size.create({ ...data, user: userId })
        .then((size) => res.status(201).json({ success: true, size }))
        .catch((err) => res.status(500).json(err))
}

exports.getUserSizes = (req, res) => {

    Size.find({user:req.user.id})
        .then((sizes) => res.status(200).json({ success: true, sizes }))
        .catch((err) => res.status(500).json(err))
}

