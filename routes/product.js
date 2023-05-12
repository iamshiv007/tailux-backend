const router = require("express").Router()
const multer = require("multer")

const { createProduct, getAllProducts, getOneProductDetails, updateProduct, deleteProduct } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth")

// Image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './productImages')
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + '-' + file.originalname
        cb(null, newName)
    }
})

const upload = multer({ storage })

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole, upload.array("images"), createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getOneProductDetails)
router.route("/admin/product/:id").patch(isAuthenticatedUser, authorizeRole, updateProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRole, deleteProduct)

module.exports = router