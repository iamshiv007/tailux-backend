const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    avatar:{
        type:String
    },
    roll:{
        type:String
    },
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