const { newAddress } = require("../controllers/addressController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = require("express").Router()

router.route('/address/new').post(isAuthenticatedUser, newAddress)

module.exports = router