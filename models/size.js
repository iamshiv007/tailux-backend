const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    top: [{
        shoulder: {
            type: String,
            required: true
        },
        backLength: {
            type: String,
            required: true
        },
        chest: {
            type: String,
            required: true
        },
        sleeve: {
            type: String,
            required: true
        },
        waist: {
            type: String,
            required: true
        },
        neck: {
            type: String,
            required: true
        }
    }]
    ,
    bottom: [{
        waist: {
            type: String,
            required: true
        },
        waistToCrotch: {
            type: String,
            required: true
        },
        length: {
            type: String,
            required: true
        },
        upperLegWidth: {
            type: String,
            required: true
        },
        inseam: {
            type: String,
            required: true
        },
        lowerLegWidth: {
            type: String,
            required: true
        },
    }]
})

module.exports = mongoose.model("Size", sizeSchema)