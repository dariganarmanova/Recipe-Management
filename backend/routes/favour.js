const express = require('express')
const app = express();
const Recipe = require('../schemas/recipe')
const User = require('../schemas/User')
app.use(express.json())

app.post('/', async (req, res) => {
    const { userId, recipe } = req.body;
    try {
        const newFavorite = new Recipe({
            userId,
            label: recipe.recipe.label,
            ingredientLines: recipe.recipe.ingredientLines
        });
        await newFavorite.save()
        console.log(newFavorite)
        res.status(201).json({ message: 'Recipe added to favorites', favorite: newFavorite });

    } catch (error) {
        res.status(500).json({ message: "trouble saving your recipe" })

    }
})

module.exports = app