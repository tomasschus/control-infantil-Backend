var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildVaccineSchema = new mongoose.Schema({
    ninioId: String,
    vaccineId: Number,
    notes: String,
    date: Date
})

ChildVaccineSchema.plugin(mongoosePaginate)
const ChildVaccine = mongoose.model('ChildVaccine', ChildVaccineSchema)

module.exports = ChildVaccine;