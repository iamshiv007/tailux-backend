const router = require('express').Router()
const { newOrder, getUserOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const { isAuthenticatedUser } = require("../middleware/auth")

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/orders').get(isAuthenticatedUser, getUserOrders)
router.route('/order/:id').patch(isAuthenticatedUser, updateOrder)
router.route('/order/:id').delete(isAuthenticatedUser, deleteOrder)

module.exports = router