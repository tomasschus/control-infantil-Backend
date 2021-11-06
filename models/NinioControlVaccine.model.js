var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioControlVaccineSchema = new mongoose.Schema({
    ninioId: String,
    date: Date,
    place: String,
    weight: Number, // [kg]
    height: Number, // [cm]
    diameter: Number, // Head in [cm]
    notes: String,
    vaccineId: String,
    recipeId: String
})

NinioControlVaccineSchema.plugin(mongoosePaginate)
const NinioControlVaccine = mongoose.model('NinioControlVaccine', NinioControlVaccineSchema)

module.exports = NinioControlVaccine;