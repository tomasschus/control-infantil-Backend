var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioSchema = new mongoose.Schema({
    emailUser: String,
    ninioId: String,
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

NinioSchema.plugin(mongoosePaginate)
const Ninio = mongoose.model('Ninio', NinioSchema)

module.exports = Ninio;