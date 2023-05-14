const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String
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
    },
    mobile: {
        type: Number,
        required: true
    },
    gender:{
        type:String,
    },
    avatar:{
        type:String
    },
    roll:{
        type:String
    }
})

module.exports = mongoose.model("User", userSchema)