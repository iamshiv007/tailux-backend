const { asyncError } = require("../../middleware/error")
const Trending = require("../../models/page/trending")

// 1. Create new Trending
exports.newTrending = asyncError(async (req, res) => {

    const trendingImages = req.files.map((file) => file.filename)

    const trennding = await Trending.create({ ...req.body, trendingImages })

    res.status(201).json({ success: true, message: "Trending Created", trending })

}
)
// 2. Get Trending by category
exports.trendingByCategory = asyncError(async (req, res) => {

    const { categoryName } = req.params

    const trending = await Trending.findOne({ category: categoryName })

    res.status(200).json({ success: true, trending })

})

// 3. Update Trending
exports.updateTrending = asyncError(async (req, res) => {

    const { id } = req.params
    const trendingImages = req.files.map((file) => file.filename)

    const updatedTrending = await Trending.findByIdAndUpdate(id, { trendingImages })

    if (!updatedTrending)
        return errorHandler(res, 404, 'Trending Not Found')

    res.status(200).json({ success: true, message: "Trending Updated" })

})

// 4. Delete Trending
exports.deleteTrending = async (req, res) => {

    const { id } = req.params

    const deletedTrending = await Trending.findByIdAndDelete(id)

    if (!deletedTrending)
        return errorHandler(res, 404, 'Trending Not Found')

    res.status(200).json({ success: true, message: "Trending deleted" })

}
