const mongoose = require("mongoose")

const customProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    designName: {
        type: String,
        required: true
    },
    fabric: {
        type: String,
        required: true
    },
    pattern: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: mongoose.Schema.ObjectId,
        ref: "Size",
        required: true
    },
    collarStyle: {
        type: String,
        required: true
    },
    buttonsStyle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("CustomProduct", customProductSchema)