var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildControlVaccineSchema = new mongoose.Schema({
    vaccineId: String,
    childId: String,
    date: Date,
})

ChildControlVaccineSchema.plugin(mongoosePaginate)
const ChildControlVaccine = mongoose.model('ChildControlVaccine', ChildControlVaccineSchema)

module.exports = ChildControlVaccine;