const express = require("express")
const router = express.Router()
const multer = require('multer')
const { isAuthenticatedUser, } = require("../../middleware/auth")
const { newCarousel, allCarousels } = require("../../controllers/pages/carouselController")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/page/carousel')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route("/carousel/new").post(isAuthenticatedUser, upload.array("carouselImages"), newCarousel)
router.route("/carousels").get(isAuthenticatedUser, allCarousels)

module.exports = router