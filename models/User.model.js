var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    id: String, // DNI
    telephone: String,
    password: String,
    date: Date,
    receiveNotification: Boolean
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;