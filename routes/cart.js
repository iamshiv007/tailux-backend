const { addToCart } = require('../controllers/cartController')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = require('express').Router()

router.route('/cart/add').post(isAuthenticatedUser, addToCart)

module.exports = router