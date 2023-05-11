const { newSize } = require("../controllers/sizeController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = require("express").Router()

router.route('/size/new').post(isAuthenticatedUser, newSize)

module.exports = router