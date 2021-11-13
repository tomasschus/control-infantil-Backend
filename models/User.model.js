var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    surname: String,
    email: String,
    telephone: String,
    password: String,
    date: Date,
    active: Boolean
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;