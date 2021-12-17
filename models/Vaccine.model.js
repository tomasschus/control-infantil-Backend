var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var VaccineSchema = new mongoose.Schema({
    name: String,
    dosis: String,
    x:Number,
    y:Number
})

const Vaccine = mongoose.model('Vaccine', VaccineSchema)

module.exports = Vaccine;