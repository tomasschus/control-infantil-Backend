var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NiñoSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date
})

NiñoSchema.plugin(mongoosePaginate)
const Niño = mongoose.model('Niño', NiñoSchema)

module.exports = Niño;