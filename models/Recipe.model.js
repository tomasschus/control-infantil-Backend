var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var RecipeSchema = new mongoose.Schema({
    recipeId: String,
    date: Date,
    imageRecipe: String,
    notes: String,
    dosis: String,
    duration: String
})

RecipeSchema.plugin(mongoosePaginate)
const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe;