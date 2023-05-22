const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { errorHandler, asyncError } = require("./error")

exports.isAuthenticatedUser = asyncError(async (req, res, next) => {

    const { token } = req.cookies

    if (!token)
        return errorHandler(res, 401, "Please login to access this resource")


    const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedData.userId)
    if (!user)
        return errorHandler(res, 404, "User Not Found")
    req.user = user
    next()

})

exports.authorizeRole = (req, res, next) => {

    if (req.user.roll !== "Admin")
        return errorHandler(res, 401, "Access denied. Only Admin can access this resource")
    next()

}