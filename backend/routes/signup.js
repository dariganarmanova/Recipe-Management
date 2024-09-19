const express = require('express')
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('../schemas/User.js');
const JWT_SECRET = 'bjdksbdjsbj'
app.use(express.json());
app.use(cors())

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newAccount = new User({
            email, password: hashedPassword
        })
        const saveAccount = await newAccount.save();
        const token = jwt.sign({ userId: saveAccount._id }, JWT_SECRET, { expiresIn: '1h' })
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Could not create the account", error: error.message });
    }
});

module.exports = app;