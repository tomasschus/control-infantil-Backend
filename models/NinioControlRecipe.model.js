var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioControlRecipeSchema = new mongoose.Schema({
    controlId: String,
    recipeId: String
})

NinioControlRecipeSchema.plugin(mongoosePaginate)
const NinioControlRecipe = mongoose.model('NinioControlRecipe', NinioControlRecipeSchema)

module.exports = NinioControlRecipe;