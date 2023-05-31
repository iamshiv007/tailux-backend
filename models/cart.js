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
        required: true,
        default: 1
    },
    size: {
        type: String,
    },
    customSize: {
        type: mongoose.Schema.ObjectId,
        ref: 'Size'
    },
    color: {
        type: String,
        required: true
    },
    designName: {
        type: String
    },
    fabric: {
        type: String
    },
    pattern: {
        type: String
    },
    collarStyle: {
        type: String
    },
    buttonsStyle: {
        type: String
    },
    customProduct: {
        type: Boolean
    }

})

module.exports = mongoose.model("Cart", cartSchema)