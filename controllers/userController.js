const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userController = {

    // 1. Register User
    register: async (req, res) => {
        try {

            const { mobile, email, password, confirmPassword, ...rest } = req.body

            if (!mobile || !email || !password || !confirmPassword)
                return res.status(400).json({ success: false, error: "Please fill all required field" })

            if (password !== confirmPassword)
                return res.status(400).json({ success: false, error: "Password does not match" })

            const userExist = await User.findOne({ email: req.body.email })

            if (userExist)
                return res.status(400).json({ success: false, error: "User with this email address already exist" })

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

            res.cookie('token', token, options).status(201).json({ success: true, user })

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // 2. Login User
    login: async (req, res) => {

        try {
            const { email, password } = req.body

            if (!email || !password)
                return res.status(400).json({ success: false, error: "Please input email and password" })

            const user = await User.findOne({ email }).select("+password")

            if (!user)
                return res.status(400).json({ success: false, error: "Invalid email or password" })

            const isPasswordMatched = await bcrypt.compare(password, user.password)

            if (!isPasswordMatched)
                return res.status(400).json({ success: false, error: "Invalid email or password" })

            const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

            const options = {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('token', token, options).status(200).json({ success: true, user })
        } catch (error) {
            res.status(500).json(error)
        }


    },

    // 3. Logout User
    logout: async (req, res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true
            }).status(200).json({ success: true, message: "Logged out" })

        } catch (error) {
            res.status(500).json(error)
        }

    },

    // 4. User Details
    getUserDetails: async (req, res) => {
        try {
            res.status(200).json({ success: true, user: req.user })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // 5. Update Profile
    updateProfile: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body)

            res.status(200).json({ success: true, messege: 'Profile Updated' })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController
