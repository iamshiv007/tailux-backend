const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
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
        price: {
            type: Number,
            reuired: true
        },
        designName: {
            type: String
        },
        fabric: {
            type: String,

        },
        pattern: {
            type: String,
        },
        color: {
            type: String,
            required: true
        },
        customSize: {
            type: mongoose.Schema.ObjectId,
            ref: "Size",
        },
        collarStyle: {
            type: String,
        },
        buttonsStyle: {
            type: String,
        },
        customProduct: {
            type: Boolean
        }
    }],
    shippingInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            // required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", orderSchema)