const router = require("express").Router()

const userController = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")


router.route("/register").post((req, res) => userController.register(req, res))
router.route("/login").post((req, res) => userController.login(req, res))
router.route("/me").get(isAuthenticatedUser, (req, res) => userController.getUserDetails(req, res))

module.exports = router;
