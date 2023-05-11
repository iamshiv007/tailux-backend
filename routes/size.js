const { newSize, getUserSizes } = require("../controllers/sizeController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = require("express").Router()

router.route('/size/new').post(isAuthenticatedUser, newSize)
router.route('/sizes').get(isAuthenticatedUser, getUserSizes)

module.exports = router