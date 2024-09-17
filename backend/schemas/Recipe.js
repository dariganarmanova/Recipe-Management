const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    label: { type: String, required: true },
    ingredientLines: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model("Recipe", RecipeSchema)