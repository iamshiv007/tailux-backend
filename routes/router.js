const router = require("express").Router()

const userRouter = require('./user')
router.use("/", userRouter)

const productRouter = require('./product')
router.use('/', productRouter)

module.exports = router
