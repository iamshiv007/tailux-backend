const router = require("express").Router()

// User
const userRouter = require('./user')
router.use("/", userRouter)


// Product
const productRouter = require('./product')
router.use('/', productRouter)

// Address
const addressRouter = require('./address')
router.use('/', addressRouter)

// Size
const sizeRouter = require('./size')
router.use("/", sizeRouter)

// Cart
const cartRouter = require('./cart')
router.use("/", cartRouter)

module.exports = router
