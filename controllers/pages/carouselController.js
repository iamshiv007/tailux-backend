const Carousel = require("../../models/page/carousel")

// 1. Create new Carousel
exports.newCarousel = (req, res) => {
    const carouselImages = req.files.map((file) => file.filename)

    Carousel.create({ ...req.body, carouselImages })
        .then((carousel) => res.status(201).json({ success: true, carousel }))
        .catch((errro) => res.status(500).json({ success: false, error }))
}

// 2. Get alll Carousel
exports.allCarousels = (req, res) => {
    Carousel.find()
        .then((carousels) => res.status(200).json({ success: true, carousels }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

