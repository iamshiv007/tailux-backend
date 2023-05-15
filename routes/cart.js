const { addToCart, getUserCartItems, removeCartItem } = require('../controllers/cartController')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = require('express').Router()

router.route('/cart/add').post(isAuthenticatedUser, addToCart)
router.route('/carts').get(isAuthenticatedUser, getUserCartItems)
router.route('/cart/:id').delete(isAuthenticatedUser, removeCartItem)

module.exports = router