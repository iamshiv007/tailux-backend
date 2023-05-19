const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    carouselImages: {
        type: Array
    },
    dealsImages: {
        type: Array
    },
    trendingImages: {
        type: Array
    },
    subcategories:{
        type:Array
    }
})

module.exports = mongoose.model("Pages", pageSchema)