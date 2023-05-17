const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies

    if (!token)
        return res.status(400).json({ success: false, message: "Please login to access this resource" })

    try {
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
       const user = await User.findById(decodedData.userId)
        if(!user)
        return res.status(404).json({success:false, message:"User Not Found"})
        req.user = user
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.authorizeRole = (req, res, next) => {
    if(req.user.roll !== "Admin")
    return res.status(400).json({success:false, error:"Access denied. Only Admin can access this resource"})
    next()
}