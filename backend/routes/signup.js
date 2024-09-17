const express = require('express')
const app = express();
const bcrypt = require('bcryptjs');
const User = require('../schemas/User.js');

app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newAccount = new User({
            email, password: hashedPassword
        })
        const saveAccount = await newAccount.save();
        //res.status(201).json({ message: 'User created successfully', user: saveAccount });
        return res.status(201).json({ userId: saveAccount._id });
    } catch (error) {
        res.status(500).json({ message: "Could not create the account", error: error.message });
    }
});

module.exports = app;