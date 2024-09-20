const express = require('express')
const app = express();
const cors = require('cors');
const Recipe = require('../schemas/Recipe')
const authenticateToken = require('../middleware/jwtAuth');
app.use(cors())
app.use(express.json())

app.delete('/delete', authenticateToken, async (req, res) => {
    console.log("Delete route hit");

    console.log(req.body)
    const { id, label, ingredientLines, userId } = req.body
    try {
        const deletedRecipe = await Recipe.findOneAndDelete({
            _id: id,
            userId: userId
        })
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }
        return res.status(200).json({ message: "Recipe deleted successfully" });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal problems, error occured" })
    }
})
module.exports = app