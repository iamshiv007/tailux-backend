const Carousel = require("../../models/page/carousel")

exports.newCarousel = (req, res) => {
    const carouselImages = req.files.map((file) => file.filename)

    Carousel.create({ ...req.body, carouselImages })
        .then((carousel) => res.status(201).json({ success: true, carousel }))
        .catch((errro) => res.status(500).json({ success: false, error }))
}