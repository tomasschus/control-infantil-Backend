var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildControlVaccineSchema = new mongoose.Schema({
    id: String,
    vaccineId: String,
    date: Date,
    notes: String
})

ChildControlVaccineSchema.plugin(mongoosePaginate)
const ChildControlVaccine = mongoose.model('ChildControlVaccine', ChildControlVaccineSchema)

module.exports = ChildControlVaccine;