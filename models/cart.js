const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    customSize: {
        type: mongoose.Schema.ObjectId,
        ref: 'Size'
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Cart", cartSchema)