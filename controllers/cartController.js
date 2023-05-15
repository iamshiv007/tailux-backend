const Cart = require('../models/cart')

// Add to cart
exports.addToCart = (req, res) => {
    Cart.create(req.body)
    .then((cart) => res.send({ success:true, cart}))
    .catch((err) => res.send({ succes:false, err}))
}

