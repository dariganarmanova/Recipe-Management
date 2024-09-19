const express = require('express')
const cors = require('cors');
const Recipe = require('../schemas/Recipe')
const authenticateToken = require('../middleware/jwtAuth');
const app = express();
app.use(express.json())
app.use(cors())

app.delete('/delete', authenticateToken, async (req, res) => {
    const { recipe } = req.body
    const recipeId = recipe._id
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        if (deletedRecipe) {
            res.status(200).json({ message: "Recipe was deleted successfully" })
        } else {
            res.status(404).json({ message: "Recipe not found or not deleted" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal problems, error occured" })
    }
})
module.exports = app