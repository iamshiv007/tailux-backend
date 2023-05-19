const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    reviewImages: {
        type: Array
    }
})

module.exports = mongoose.model("Reviews", reviewSchema)