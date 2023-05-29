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

// Order
const orderRouter = require('./order')
router.use('/', orderRouter)

// review
const reviewRouter = require('./review')
router.use("/", reviewRouter)

// Page
const pageRouter = require('./page')
router.use('/', pageRouter)

// Deal
const carouselRouter = require('./page/carousel')
router.use('/', carouselRouter)

// Deal
const dealRouter = require('./page/deal')
router.use('/', dealRouter)

// trending
const trendingRouter = require('./page/trending')
router.use('/', trendingRouter)

// custom product
const customProductRouter = require('./customProduct')
router.use('/', customProductRouter)

module.exports = router
