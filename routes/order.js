const router = require('express').Router()
const { newOrder, getUserOrders } = require('../controllers/orderController')
const { isAuthenticatedUser } = require("../middleware/auth")

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/orders').get(isAuthenticatedUser, getUserOrders)

module.exports = router