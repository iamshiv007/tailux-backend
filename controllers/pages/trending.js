const Trending = require("../../models/page/trending")

// 1. Create new Trending
exports.newTrending = (req, res) => {
    const trendingImages = req.files.map((file) => file.filename)

    Trending.create({ ...req.body, trendingImages })
        .then((trending) => res.status(201).json({ success: true, trending }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 2. Get Trending by category
exports.trendingByCategory = (req, res) => {
    const { categoryName } = req.params

    Trending.findOne({ category: categoryName })
        .then((trending) => res.status(200).json({ success: true, trending }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 3. Update Trending
exports.updateTrending = async (req, res) => {

    const { id } = req.params
    const trendingImages = req.files.map((file) => file.filename)

    try {
        const updatedTrending = await Trending.findByIdAndUpdate(id, { trendingImages })

        if (!updatedTrending)
            return res.status(400).json({ success: false, error: 'Trending Not Found' })
        res.status(200).json({ success: true, trendingUpdated: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}

// 4. Delete Trending
exports.deleteTrending = async (req, res) => {
    const { id } = req.params

    try {
        const deletedTrending = await Trending.findByIdAndDelete(id)

        if (!deletedTrending)
            return res.status(400).json({ success: false, error: 'Trending Not Found' })

        res.status(200).json({ success: true, trendingDeleted: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
