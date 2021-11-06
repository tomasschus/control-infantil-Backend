var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioControlVaccineSchema = new mongoose.Schema({
    ninioId: String,
    vaccineId: String,
    date: Date,
    notes: String
})

NinioControlVaccineSchema.plugin(mongoosePaginate)
const NinioControlVaccine = mongoose.model('NinioControlVaccine', NinioControlVaccineSchema)

module.exports = NinioControlVaccine;