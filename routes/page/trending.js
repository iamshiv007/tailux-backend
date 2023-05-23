const express = require("express")
const router = express.Router()
const multer = require('multer')
const { isAuthenticatedUser, authorizeRole, } = require("../../middleware/auth")
const { newTrending, trendingByCategory, updateTrending, deleteTrending } = require("../../controllers/pages/trending")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/page/trending')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route("/trending/new").post(isAuthenticatedUser, authorizeRole, upload.array("trendingImages"), newTrending)
router.route("/trending/category/:categoryName").get(trendingByCategory)
router.route("/trending/:id").patch(isAuthenticatedUser, authorizeRole, upload.array("trendingImages"), updateTrending)
router.route("/trending/:id").delete(isAuthenticatedUser, authorizeRole, deleteTrending)

module.exports = router