const router = require("express").Router()
const multer = require("multer")

const userController = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './avatars')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })


router.route("/register").post(upload.single("avatar"), (req, res) => userController.register(req, res))
router.route("/login").post((req, res) => userController.login(req, res))
router.route("/me").get(isAuthenticatedUser, (req, res) => userController.getUserDetails(req, res))
router.route("/logout").get((req, res) => userController.logout(req, res))
router.route("/me/update").patch(isAuthenticatedUser, (req, res) => userController.updateProfile(req, res))

module.exports = router;

