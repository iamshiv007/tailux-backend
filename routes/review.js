const express = require("express")
const { isAuthenticatedUser } = require("../middleware/auth")
const { newReview } = require("../controllers/reviewController")
const router = express.Router()
const multer = require('multer')

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/reviewImages')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route('/review/new').post(isAuthenticatedUser, upload.array("reviewImages"), newReview)

module.exports = router