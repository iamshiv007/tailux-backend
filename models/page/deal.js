const mongoose = require("mongoose")

const dealSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    dealImages: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Deal", dealSchema)