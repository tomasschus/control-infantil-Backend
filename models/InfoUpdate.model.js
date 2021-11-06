var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InfoUpdateSchema = new mongoose.Schema({
    date: Date,
    title: String,
    description: String,
    imageName: String
})

InfoUpdateSchema.plugin(mongoosePaginate)
const InfoUpdate = mongoose.model('InfoUpdate', InfoUpdateSchema)

module.exports = InfoUpdate;