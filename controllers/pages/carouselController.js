const Carousel = require("../../models/page/carousel")

// 1. Create new Carousel
exports.newCarousel = (req, res) => {
    const carouselImages = req.files.map((file) => file.filename)

    Carousel.create({ ...req.body, carouselImages })
        .then((carousel) => res.status(201).json({ success: true, carousel }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 2. Get Carousel by category
exports.carouselByCategory = (req, res) => {
    const { categoryName } = req.params

    Carousel.findOne({ category: categoryName })
        .then((carousel) => res.status(200).json({ success: true, carousel }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 3. Update Carousel
exports.updateCarousel = async (req, res) => {

    const { id } = req.params
    const carouselImages = req.files.map((file) => file.filename)

    try {
        const updatedCarousel = await Carousel.findByIdAndUpdate(id, { carouselImages })

        if (!updatedCarousel)
            return res.status(400).json({ success: false, error: 'Carousel Not Found' })
        res.status(200).json({ success: true, carouselUpdated: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}

// 4. Delete Carousel
exports.deleteCarousel = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCarousel = await Carousel.findByIdAndDelete(id)

        if (!deletedCarousel)
            return res.status(400).json({ success: false, error: 'Carousel Not Found' })

        res.status(200).json({ success: true, carouselDeleted: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
