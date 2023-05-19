const Review = require("../models/review")

exports.newReview = (req, res) => {
    console.log(req.body, req.files)
    const reviewImages = req.files.map((file) => file.filename)

    Review.create({ ...req.body, user: req.user._id, reviewImages })
        .then((review) => res.status(201).json({ success: true, review }))
        .catch((error) => res.status(500).json({ success: false, error }))
}