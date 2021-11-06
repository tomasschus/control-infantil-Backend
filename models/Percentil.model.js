var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PercentilSchema = new mongoose.Schema({
    percentilId: String,
    unit: String,
    time: String,
    isWeight: Boolean, // (isWeight == FALSE ) => isHeight
    isFemale: Boolean // (isFemale == FALSE ) => isMale
})

PercentilSchema.plugin(mongoosePaginate)
const Percentil = mongoose.model('Percentil', PercentilSchema)

module.exports = Percentil;