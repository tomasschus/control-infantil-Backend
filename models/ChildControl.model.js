var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ChildControlSchema = new mongoose.Schema({
    id: String,
    date: Date,
    place: String,
    weight: Number, // [kg]
    height: Number, // [cm]
    diameter: Number, // Head in [cm]
    notes: String
})

ChildControlSchema.plugin(mongoosePaginate)
const ChildControl = mongoose.model('ChildControl', ChildControlSchema)

module.exports = ChildControl;