const { newAddress, getUserAddresses } = require("../controllers/addressController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = require("express").Router()

router.route('/address/new').post(isAuthenticatedUser, newAddress)
router.route('/addresses').get(isAuthenticatedUser, getUserAddresses)

module.exports = router