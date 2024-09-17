const express = require('express')
const app = express();
const bcrypt = require('bcryptjs');
const User = require('../schemas/User')

app.use(express.json())

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const findAccount = await User.findOne({ email })
        if (!findAccount) {
            return res.json({ message: "Cannot find account" })
        }
        console.log("account found", findAccount)
        const isMatch = await bcrypt.compare(password, findAccount.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        return res.json({ userId: findAccount._id })
    } catch (error) {
        res.status(500).json({ message: "Trouble finding your account" })
    }
})

module.exports = app;