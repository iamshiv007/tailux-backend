const Deal = require("../../models/page/deal")

// 1. Create new Deal
exports.newDeal = (req, res) => {
    const dealImages = req.files.map((file) => file.filename)

    Deal.create({ ...req.body, dealImages })
        .then((deal) => res.status(201).json({ success: true, deal }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 2. Get Deal by category
exports.dealByCategory = (req, res) => {
    const { categoryName } = req.params

    Deal.findOne({ category: categoryName })
        .then((deal) => res.status(200).json({ success: true, deal }))
        .catch((error) => res.status(500).json({ success: false, error }))
}

// 3. Update Deal
exports.updateDeal = async (req, res) => {

    const { id } = req.params
    const dealImages = req.files.map((file) => file.filename)

    try {
        const updatedDeal = await Deal.findByIdAndUpdate(id, req.files.length !== 0 ? { dealImages, ...req.body } : req.body)

        if (!updatedDeal)
            return res.status(400).json({ success: false, error: 'Deal Not Found' })
        res.status(200).json({ success: true, dealUpdated: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}

// 4. Delete Deal
exports.deleteDeal = async (req, res) => {
    const { id } = req.params

    try {
        const deletedDeal = await Deal.findByIdAndDelete(id)

        if (!deletedDeal)
            return res.status(400).json({ success: false, error: 'Deal Not Found' })

        res.status(200).json({ success: true, dealDeleted: true })

    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
