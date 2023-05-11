const Product = require('../models/product')

// 1. New Product -- Admin
exports.createProduct = (req, res) => {
    Product.create(req.body)
    .then((product) => res.status(201).json({success:true, product}))
    .catch((err) => res.status(500).json(err))
}

// 2. Get All Products
exports.getAllProducts = (req, res) => {
    Product.find()
    .then((products) => res.status(200).json({success:true, products}))
    .catch((err) => res.status(500).json(err))
}

// 3. One Product Details
exports.getOneProductDetails = (req, res) => {
    Product.findById(req.params.id)
    .then((product) => res.status(200).json({success:true, product}))
    .catch((err) => res.status(500).json(err))
}

