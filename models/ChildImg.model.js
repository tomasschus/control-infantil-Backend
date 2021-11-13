var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ChildImgSchema = new mongoose.Schema({
    ninioId: String,
    imageName: String,
    date: Date
})

ChildImgSchema.plugin(mongoosePaginate)
const ChildImg = mongoose.model('ChildImg', ChildImgSchema)

module.exports = ChildImg;