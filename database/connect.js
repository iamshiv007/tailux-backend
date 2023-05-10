const mongoose = require("mongoose")

const MONGO_URI = 'mongodb://localhost:27017/tailux'

const connect = async(req, res) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect