const express = require('express')
const app = express();
const Recipe = require('../schemas/Recipe.js')
const User = require('../schemas/User')
const cors = require('cors')
const authenticateToken = require('../middleware/jwtAuth.js')
app.use(express.json())
app.use(cors())

app.post('/', authenticateToken, async (req, res) => {
    const { recipe } = req.body;
    const userId = req.user.userId
    try {
        const newFavorite = new Recipe({
            userId,
            label: recipe.recipe.label,
            ingredientLines: recipe.recipe.ingredientLines
        });
        await newFavorite.save()
        res.status(201).json({ message: 'Recipe added to favorites', favorite: newFavorite });

    } catch (error) {
        res.status(500).json({ message: "trouble saving your recipe" })

    }
})

module.exports = app