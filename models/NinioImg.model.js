var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NinioImgSchema = new mongoose.Schema({
    ninioId: String,
    imageName: String,
    date: Date
})

NinioImgSchema.plugin(mongoosePaginate)
const NinioImg = mongoose.model('NinioImg', NinioImgSchema)

module.exports = NinioImg;