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

    Size.find({ user: req.user.id })
        .then((sizes) => res.status(200).json({ success: true, sizes }))
        .catch((err) => res.status(500).json(err))
}

exports.deleteSize = async (req, res) => {
    try {
        const size = await Size.findByIdAndDelete(req.params.id)

        if (!size)
            return res.status(404).json({ success: false, error: "Size Not Found" })

        res.status(200).json({ success: true, message: "Size Deleted" })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateSize = async (req, res) => {
    try {
        const size = await Size.findByIdAndUpdate(req.params.id, req.body)

        if (!size)
            return res.status(404).json({ success: false, error: "Size Not Found" })

        res.status(200).json({ success: true, message: "Size Updated" })
    } catch (error) {
        res.status(500).json(error)
    }
}
