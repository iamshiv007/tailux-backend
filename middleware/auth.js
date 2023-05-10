const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies

    if (!token)
        return res.json({ success: false, error: "Please login to access this resource" })

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.userId)
    next()
}