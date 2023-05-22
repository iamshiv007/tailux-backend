const { asyncError, errorHandler } = require('../middleware/error')
const Size = require('../models/size')

// 1. Create New Size
exports.newSize = asyncError(async (req, res) => {

    const { ...data } = req.body
    const userId = req.user._id

    const size = await Size.create({ ...data, user: userId })

    res.status(201).json({ success: true, message: "Size Created", size })

})

exports.getUserSizes = asyncError(async (req, res) => {

    const sizes = await Size.find({ user: req.user.id })

    res.status(200).json({ success: true, sizes })

})

exports.deleteSize = asyncError(async (req, res) => {

    const size = await Size.findByIdAndDelete(req.params.id)

    if (!size)
        return errorHandler(res, 404, "Size Not Found")

    res.status(200).json({ success: true, message: "Size Deleted" })

})

exports.updateSize = asyncError(async (req, res) => {

    const size = await Size.findByIdAndUpdate(req.params.id, req.body)

    if (!size)
        return errorHandler(res, 404, "Size Not Found")

    res.status(200).json({ success: true, message: "Size Updated" })

})
