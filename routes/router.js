const router = require("express").Router()

const userRouter = require('./user')
router.use("/", userRouter)

const productRouter = require('./product')
router.use('/', productRouter)

const addressRouter = require('./address')
router.use('/', addressRouter)

const sizeRouter = require('./size')
router.use("/", sizeRouter)

module.exports = router
