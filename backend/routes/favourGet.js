const express = require('express')
const app = express();
const Recipe = require('../schemas/recipe');
const User = require('../schemas/User')
const authenticateToken = require('../middleware/jwtAuth.js')
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/get', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId
        const favorites = await Recipe.find({ userId })
        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found' });
        }

        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Trouble retrieving your favorites' });
    }
}
)
module.exports = app