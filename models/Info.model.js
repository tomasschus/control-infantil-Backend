var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InfoSchema = new mongoose.Schema({
    id: String,
    type: String,
    title: String,
    description: String,
    imgUrl: String,
    button: String,
    date: Date
})

InfoSchema.plugin(mongoosePaginate)
const Info = mongoose.model('Info', InfoSchema)

module.exports = Info;