const router = require("express").Router()
const multer = require("multer")

const { register, login, getUserDetails, updateProfile, logout } = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/avatars')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })


router.route("/register").post(upload.single('avatar'), register)
router.route("/login").post(login)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/logout").get(logout)
router.route("/me/update").patch(isAuthenticatedUser, updateProfile)

module.exports = router;

