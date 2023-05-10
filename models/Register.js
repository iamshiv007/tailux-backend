const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be 6 characters"]
    }
})

module.exports = mongoose.model("User", userSchema)