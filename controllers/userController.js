const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { asyncError, errorHandler } = require("../middleware/error")


// 1. Register User
exports.register = asyncError(async (req, res) => {
    const { mobile, email, password, confirmPassword, ...rest } = req.body

    const avatar = req.file ? req.file.filename : ""

    if (!mobile || !email || !password || !confirmPassword)
        return errorHandler(res, 400, "Please fill all required fields")

    if (password !== confirmPassword)
        return errorHandler(res, 400, "Password does not match")

    const userExist = await User.findOne({ email: req.body.email })

    if (userExist)
        return errorHandler(res, 400, "User with this email address already exist")

    // Password hashed
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)

    const user = await User.create({ mobile, email, password: secPass, ...rest })

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('token', token, options).status(201).json({ success: true, message: "Signup successfully", user })
}),

    // 2. Login User
    exports.login = asyncError(async (req, res) => {

        const { email, password } = req.body

        if (!email || !password)
            return errorHandler(res, 400, "Please input email and password")

        const user = await User.findOne({ email }).select("+password")

        if (!user)
            return errorHandler(res, 400, "Invalid email or password")

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched)
            return errorHandler(res, 400, "Invalid email or password")

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        res.cookie('token', token, options).status(200).json({ success: true, message: "Logged In successfully", user })

    }),

    // 3. Logout User
    exports.logout = async (req, res) => {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).status(200).json({ success: true, message: "Logged out" })

    },

    // 4. User Details
    exports.getUserDetails = asyncError(async (req, res) => {

        res.status(200).json({ success: true, user: req.user })

    }),

    // 5. Update Profile
    exports.updateProfile = asyncError(async (req, res) => {

        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body)

        res.status(200).json({ success: true, messege: 'Profile Updated' })

    }
    )