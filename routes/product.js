const { createProduct } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth")

const router = require("express").Router()

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole, createProduct)

module.exports = router