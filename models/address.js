const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
   },
   name: {
      type: String,
      required: true
   },
   mobileNo: {
      type: Number,
      required: true
   },
   street: {
      type: String,
      required: true
   },
   pincode: {
      type: Number,
      required: true
   },
   locality: {
      type: String,
      required: true
   },
   city: {
      type: String,
      required: true
   },
   state: {
      type: String,
      required: true
   },
   landmark: {
      type: String,
   },
   alternateMobileNo: {
      type: Number
   },
   primaryLocation: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model("Address", addressSchema)