const { createCustomProduct, userCustomProducts, deleteCustomProduct, updateCustomProduct } = require('../controllers/customProduct')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = require('express').Router()

router.route('/customProduct/new').post(isAuthenticatedUser, createCustomProduct)
router.route('/customProducts').get(isAuthenticatedUser, userCustomProducts)
router.route('/customProduct/:id').delete(isAuthenticatedUser, deleteCustomProduct)
router.route('/customProduct/:id').put(isAuthenticatedUser, updateCustomProduct)

module.exports = router