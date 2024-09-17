const express = require('express')
const app = express();
const Recipe = require('../schemas/recipe');
const User = require('../schemas/User')

app.use(express.json())

app.get('/get/:userId', async (req, res) => {
    try {
        const { userId } = req.params
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