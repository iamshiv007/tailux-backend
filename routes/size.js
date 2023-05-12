const router = require("express").Router()

const { newSize, getUserSizes, deleteSize, updateSize } = require("../controllers/sizeController")
const { isAuthenticatedUser } = require("../middleware/auth")

router.route('/size/new').post(isAuthenticatedUser, newSize)
router.route('/sizes').get(isAuthenticatedUser, getUserSizes)
router.route('/size/:id').delete(isAuthenticatedUser, deleteSize)
router.route('/size/:id').patch(isAuthenticatedUser, updateSize)

module.exports = router