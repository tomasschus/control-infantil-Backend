var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioControlSchema = new mongoose.Schema({
    ninioId: String,
    date: Date,
    place: String,
    weight: Number, // [kg]
    height: Number, // [cm]
    diameter: Number, // Head in [cm]
    notes: String,
    vaccineId: [String],
    recipeId: String
})

NinioControlSchema.plugin(mongoosePaginate)
const NinioControl = mongoose.model('NinioControl', NinioControlSchema)

module.exports = NinioControl;