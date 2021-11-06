var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioVaccineSchema = new mongoose.Schema({
    ninioId: String,
    vaccineId: Number,
    notes: String,
    date: Date
})

NinioVaccineSchema.plugin(mongoosePaginate)
const NinioVaccine = mongoose.model('NinioVaccine', NinioVaccineSchema)

module.exports = NinioVaccine;