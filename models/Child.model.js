var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildSchema = new mongoose.Schema({
    emailUser: String,
    id: String,
    imageName: String,
    name: String,
    surname: String,
    gender: String, // F or M
    birthday: String, // Format: DD/MM/YYYY
    age: String,
    bloodType: String,
    notes: String,
    date: Date
})

ChildSchema.plugin(mongoosePaginate)
const Child = mongoose.model('Child', ChildSchema)

module.exports = Child;