const User = require("../models/register")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userController = {
    register: async (req, res) => {
        try {

            const { mobile, email, password, confirmPassword } = req.body

            if (!mobile || !email || !password || !confirmPassword)
                return res.json({ success: false, error: "Please fill all required field" })

            if (password !== confirmPassword)
                return res.json({ success: false, error: "Password does not match" })

            const userExist = await User.findOne({ email: req.body.email })

            if (userExist)
                return res.json({ success: false, error: "User with this email address already exist" })

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(password, salt)

            const user = await User.create({ mobile, email, password: secPass })

            const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

            const options = {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                ),
                // httpOnly: true
            }

            res.cookie('token', token, options).json({ success: true, user })

        } catch (error) {
            res.send(error)
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body

        if (!email || !password)
            return res.json({ success: false, error: "Please input email and password" })

        const user = await User.findOne({ email }).select("+password")

        if (!user)
            return res.json({ success: false, error: "Invalid email or password" })

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched)
            return res.json({ success: false, error: "Invalid email or password" })

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            // httpOnly: true
        }

        res.cookie('token', token, options).json({ success: true, user, token })
    }
}

module.exports = userController
