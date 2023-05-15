const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Cart", cartSchema)