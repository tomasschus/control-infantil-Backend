var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var VaccineSchema = new mongoose.Schema({
    vaccineId: String,
    name: String,
    description: String,
    notes: String
})

VaccineSchema.plugin(mongoosePaginate)
const Vaccine = mongoose.model('Vaccine', VaccineSchema)

module.exports = Vaccine;