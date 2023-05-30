const { asyncError, errorHandler } = require('../middleware/error')
const Product = require('../models/product')

// 1. New Product -- Admin
exports.createProduct = asyncError((req, res) => {


    const images = req.files.map((file) => file.filename)

    const { name, description, price, discount, ratings, category, stock, numOfReviews, colors, sizes } = req.body

    if (!name || !description || !price || !discount || !ratings || !category || !stock || !numOfReviews || !colors || !sizes || images.length === 0)
        return errorHandler(res, 400, "Please fill all required fields")

    Product.create({ ...req.body, images })
        .then((product) => res.status(201).json({ success: true, product }))
        .catch((err) => res.status(500).json(err))
})

// 2. Get All Products
exports.getAllProducts = asyncError((req, res) => {

    const { category } = req.body

    if (category) {
        Product.find({ category })
            .then((products) => res.status(200).json({ success: true, products }))
            .catch((err) => res.status(500).json(err))
    } else {
        Product.find()
            .then((products) => res.status(200).json({ success: true, products }))
            .catch((err) => res.status(500).json(err))
    }

})

// 3. One Product Details
exports.getOneProductDetails = asyncError(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (!product)
        return errorHandler(res, 404, "Product Not Found")

    res.status(200).json({ success: true, product })

})

// 4. Update Product -- Admin
exports.updateProduct = asyncError(async (req, res) => {

    console.log(req.files)
    const images = req.files.map((file) => file.filename)

    const product = await Product.findByIdAndUpdate(req.params.id, req.files.length !== 0 ? { ...req.body, images } : req.body)
    if (!product)
        return errorHandler(res, 404, "Product Not Found")

    res.status(200).json({ success: true, message: "Product Updated" })

})

// 5. Delete Product -- Admin
exports.deleteProduct = asyncError(async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product)
        return errorHandler(res, 404, "Product Not Found")

    res.status(200).json({ success: true, message: "Product Deleted" })

})

// 6. Get Products By Category
exports.productsByCategory = asyncError(async (req, res) => {

    const category = req.params.category

    const products = await Product.find({ category })

    res.status(200).json({ success: true, products })
})