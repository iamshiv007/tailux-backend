const { asyncError, errorHandler } = require("../../middleware/error")
const Carousel = require("../../models/page/carousel")

// 1. Create new Carousel
exports.newCarousel = asyncError(async (req, res) => {

    const carouselImages = req.files.map((file) => file.filename)

    const carousel = await Carousel.create({ ...req.body, carouselImages })

    res.status(201).json({ success: true, message: "Carousel Created", carousel })

})

// 2. Get Carousel by category
exports.carouselByCategory = asyncError(async (req, res) => {

    const { categoryName } = req.params

    const carousel = await Carousel.findOne({ category: categoryName })

    res.status(200).json({ success: true, carousel })
})

// 3. Update Carousel
exports.updateCarousel = asyncError(async (req, res) => {

    const { id } = req.params
    const carouselImages = req.files.map((file) => file.filename)

    const updatedCarousel = await Carousel.findByIdAndUpdate(id, { carouselImages })

    if (!updatedCarousel)
        return errorHandler(res, 404, 'Carousel Not Found')

    res.status(200).json({ success: true, message: 'Carousel Updated' })

})

// 4. Delete Carousel
exports.deleteCarousel = asyncError(async (req, res) => {
    const { id } = req.params

    const deletedCarousel = await Carousel.findByIdAndDelete(id)

    if (!deletedCarousel)
        return errorHandler(res, 404, 'Carousel Not Found')

    res.status(200).json({ success: true, message: "Carousel deleted" })

})
