const { asyncError } = require("../middleware/error")
const Review = require("../models/review")

exports.newReview = asyncError(async (req, res) => {

    const reviewImages = req.files.map((file) => file.filename)

    const review = await Review.create({ ...req.body, user: req.user._id, reviewImages })

    res.status(201).json({ success: true, message: "Review Created", review })

})

exports.productReviews = asyncError(async (req, res) => {

    const { id } = req.params

    const reviews = await Review.find({ product: id })

    res.status(200).json({ success: true, reviews })

})

exports.deleteReview = asyncError(async (req, res) => {

    const { id } = req.params

    const deletedReview = await Review.findByIdAndDelete(id)

    if (!deletedReview)
        return errorHandler(res, 404, "Review Not Found")

    res.status(200).json({ success: true, message: "Review Deleted" })

})

exports.updateReview = asyncError(async (req, res) => {

    const reviewImages = req.files.map((file) => file.filename)

    const { id } = req.params

    const updatedReview = await Review.findByIdAndUpdate(id, req.files.length !== 0 ? { reviewImages, ...req.body } : req.body)

    if (!updatedReview)
        return errorHandler(res, 404, "Review Not Found")

    res.status(200).json({ success: true, message: "Review Updated" })

})