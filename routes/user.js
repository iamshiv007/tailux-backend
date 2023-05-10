const router = require("express").Router()

const userController = require("../controllers/userController")


router.route("/register").post((req, res) => userController.register(req, res))

module.exports = router;
