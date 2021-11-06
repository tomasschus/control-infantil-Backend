var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserImgSchema = new mongoose.Schema({
    email: String,
    nombreImagen: String,
    date: Date
    
})

UserImgSchema.plugin(mongoosePaginate)
const UserImg = mongoose.model('UserImg', UserImgSchema)

module.exports = UserImg;