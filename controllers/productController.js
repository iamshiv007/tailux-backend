const Product = require('../models/product')

// 1. New Product -- Admin
exports.createProduct = (req, res) => {
    const images = req.files.map((file) => file.filename)

    Product.create({ ...req.body, images })
        .then((product) => res.status(201).json({ success: true, product }))
        .catch((err) => res.status(500).json(err))
}

// 2. Get All Products
exports.getAllProducts = (req, res) => {

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

}

// 3. One Product Details
exports.getOneProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product)
            return res.status(404).json({ success: false, error: "Product Not Found" })

        res.status(200).json({ success: true, product })

    } catch (error) {
        res.status(500).json(error)

    }
}

// 4. Update Product -- Admin
exports.updateProduct = async (req, res) => {

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)
        if (!product)
            return res.status(404).json({ success: false, error: "Product Not Found" })

        res.status(200).json({ success: true, message: "Product Updated" })

    } catch (error) {
        res.status(500).json(error)
    }
}

// 5. Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product)
            return res.status(404).json({ success: false, error: "Product Not Found" })

        res.status(200).json({ success: true, message: "Product Deleted" })

    } catch (error) {
        res.status(500).json(error)

    }
}