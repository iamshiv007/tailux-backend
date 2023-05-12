const router = require("express").Router()

const { newAddress, getUserAddresses, deleteAddress, upadateAddress } = require("../controllers/addressController")
const { isAuthenticatedUser } = require("../middleware/auth")

router.route('/address/new').post(isAuthenticatedUser, newAddress)
router.route('/addresses').get(isAuthenticatedUser, getUserAddresses)
router.route('/address/:id').delete(isAuthenticatedUser, deleteAddress)
router.route('/address/:id').patch(isAuthenticatedUser, upadateAddress)

module.exports = router