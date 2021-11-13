var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildControlRecipeSchema = new mongoose.Schema({
    controlId: String,
    recipeId: String
})

ChildControlRecipeSchema.plugin(mongoosePaginate)
const ChildControlRecipe = mongoose.model('ChildControlRecipe', ChildControlRecipeSchema)

module.exports = ChildControlRecipe;