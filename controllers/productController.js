const Product = require('../models/product')

// 1. New Product
exports.createProduct = (req, res) => {
    Product.create(req.body)
    .then((product) => res.status(201).json({success:true, product}))
    .catch((err) => res.status(500).json(err))
}

