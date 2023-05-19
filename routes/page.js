const express = require("express")
const { newPage } = require("../controllers/pageController")
const router = express.Router()
const multer = require('multer')
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/pageImages')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route("/page/new").post(isAuthenticatedUser, authorizeRole, upload.fields([{ name: "carouselImages", maxCount: 10 }, { name: "dealsImages", maxCount: 10 }, { name: "trendingImages", maxCount: 10 }]), newPage)

module.exports = router