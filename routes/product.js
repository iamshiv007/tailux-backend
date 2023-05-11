const { createProduct, getAllProducts, getOneProductDetails, updateProduct, deleteProduct } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth")

const router = require("express").Router()

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole, createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getOneProductDetails)
router.route("/admin/product/:id").patch(isAuthenticatedUser, authorizeRole, updateProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRole, deleteProduct)

module.exports = router