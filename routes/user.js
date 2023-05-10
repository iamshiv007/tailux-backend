const router = require("express").Router()

const userController = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")


router.route("/register").post((req, res) => userController.register(req, res))
router.route("/login").post((req, res) => userController.login(req, res))
router.route("/me").get(isAuthenticatedUser, (req, res) => userController.getUserDetails(req, res))
router.route("/logout").get((req, res) => userController.logout(req, res))
router.route("/me/update").patch(isAuthenticatedUser, (req, res) => userController.updateProfile(req, res))

module.exports = router;

