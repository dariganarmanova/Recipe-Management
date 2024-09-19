const express = require('express')
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('../schemas/User')

app.use(express.json())
const JWT_SECRET = 'bjdksbdjsbj'

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const findAccount = await User.findOne({ email })
        if (!findAccount) {
            return res.json({ message: "Cannot find account" })
        }
        const isMatch = await bcrypt.compare(password, findAccount.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: findAccount._id }, JWT_SECRET, { expiresIn: '1h' })
        return res.json({ token })
    } catch (error) {
        res.status(500).json({ message: "Trouble finding your account" })
    }
})

module.exports = app;