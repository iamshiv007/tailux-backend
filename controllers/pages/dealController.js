const { asyncError } = require("../../middleware/error")
const Deal = require("../../models/page/deal")

// 1. Create new Deal
exports.newDeal = asyncError(async (req, res) => {

    const dealImages = req.files.map((file) => file.filename)

    const deal = await Deal.create({ ...req.body, dealImages })

    res.status(201).json({ success: true, message: "Deal Created", deal })

})

// 2. Get Deal by category
exports.dealByCategory = asyncError(async (req, res) => {

    const { categoryName } = req.params

    const deal = await Deal.findOne({ category: categoryName })

    res.status(200).json({ success: true, deal })

})

// 3. Update Deal
exports.updateDeal = asyncError(async (req, res) => {

    const { id } = req.params
    const dealImages = req.files.map((file) => file.filename)
    const updatedDeal = await Deal.findByIdAndUpdate(id, req.files.length !== 0 ? { dealImages, ...req.body } : req.body)

    if (!updatedDeal)
        return errorHandler(res, 404, 'Deal Not Found')

    res.status(200).json({ success: true, message: "Deal Updated" })
})

// 4. Delete Deal
exports.deleteDeal = asyncError(async (req, res) => {

    const { id } = req.params
    const deletedDeal = await Deal.findByIdAndDelete(id)

    if (!deletedDeal)
        return errorHandler(res, 404, 'Deal Not Found')

    res.status(200).json({ success: true, message: "Deal Deleted" })

}
)