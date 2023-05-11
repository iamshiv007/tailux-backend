const { createProduct, getAllProducts, getOneProductDetails } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth")

const router = require("express").Router()

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole, createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getOneProductDetails)

module.exports = router