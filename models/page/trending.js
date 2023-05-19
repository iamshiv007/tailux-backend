const mongoose = require("mongoose")

const trendingSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    trendingImages: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("trending", trendingSchema)