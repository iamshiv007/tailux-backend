const express = require("express")
const router = express.Router()
const multer = require('multer')
const { isAuthenticatedUser, authorizeRole, } = require("../../middleware/auth")
const { newCarousel, carouselByCategory, updateCarousel, deleteCarousel } = require("../../controllers/pages/carouselController")

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

router.route("/carousel/new").post(isAuthenticatedUser, authorizeRole, upload.array("carouselImages"), newCarousel)
router.route("/carousel/category/:categoryName").get(carouselByCategory)
router.route("/carousel/:id").patch(isAuthenticatedUser, authorizeRole, upload.array("carouselImages"), updateCarousel)
router.route("/carousel/:id").delete(isAuthenticatedUser, authorizeRole, deleteCarousel)

module.exports = router