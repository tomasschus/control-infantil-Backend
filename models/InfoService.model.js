var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InfoServiceSchema = new mongoose.Schema({
    date: Date,
    title: String,
    description: String,
    button: String,
    imageName: String
})

InfoServiceSchema.plugin(mongoosePaginate)
const InfoService = mongoose.model('InfoService', InfoServiceSchema)

module.exports = InfoService;