const Page = require("../models/page")

exports.newPage = (req, res) => {

    const carouselImages = req.files.carouselImages.map((file) => file.filename)

    const dealsImages = req.files.dealsImages.map((file) => file.filename)

    const trendingImages = req.files.trendingImages.map((file) => file.filename)

    Page.create({ ...req.body, carouselImages, dealsImages, trendingImages })
        .then((offers) => res.status(201).json({ success: true, offers }))
        .catch((error) => res.status(500).json({ success: false, error }))
}
