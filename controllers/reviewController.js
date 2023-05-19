const Review = require("../models/review")

exports.newReview = (req, res) => {

    const reviewImages = req.files.map((file) => file.filename)

    Review.create({ ...req.body, user: req.user._id, reviewImages })
        .then((review) => res.status(201).json({ success: true, review }))
        .catch((error) => res.status(500).json({ success: false, error }))
}