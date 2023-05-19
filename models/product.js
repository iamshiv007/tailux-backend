const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"]
    },
    discount: {
        type: Number,
        required: [true, "Please Enter Product MRP"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    stock: {
        type: Number,
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    colors: {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema)