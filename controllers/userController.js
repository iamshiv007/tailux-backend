const User = require("../models/register")

const userController = {
    register: async (req, res) => {
        try {

            const { mobile, email, password } = req.body


            if (!mobile || !email || !password)
                return res.send({ success: false, error: "Please fill all required field" })

            const userExist = await User.findOne({ email: req.body.email })

            if (userExist)
                return res.send({ success: false, error: "User with this email address already exist" })

            const user = await User.create(req.body)

            res.send({ success: true, user })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = userController
