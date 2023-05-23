const express = require("express")
const router = express.Router()
const multer = require('multer')
const { isAuthenticatedUser, authorizeRole, } = require("../../middleware/auth")
const { newDeal, dealByCategory, updateDeal, deleteDeal } = require("../../controllers/pages/dealController")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/page/deal')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route("/deal/new").post(isAuthenticatedUser, authorizeRole, upload.array("dealImages"), newDeal)
router.route("/deal/category/:categoryName").get(dealByCategory)
router.route("/deal/:id").patch(isAuthenticatedUser, authorizeRole, upload.array("dealImages"), updateDeal)
router.route("/deal/:id").delete(isAuthenticatedUser, authorizeRole, deleteDeal)

module.exports = router