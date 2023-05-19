const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    carouselImages: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('carousel', carouselSchema)