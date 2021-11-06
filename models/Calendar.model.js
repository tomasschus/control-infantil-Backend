var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CalendarSchema = new mongoose.Schema({
    vaccineId: Number,
    col0: String, // Edad vacunas
    col1: String,
    col2: String,
    col3: String,
    col4: String,
    col5: String,
    col6: String,
    col7: String,
    col8: String,
    col9: String,
    col10: String,
    col11: String,
    col12: String,
    col13: String,
    col14: String,
    col15: String,
    col16: String
})

CalendarSchema.plugin(mongoosePaginate)
const Calendar = mongoose.model('Calendar', CalendarSchema)

module.exports = Calendar;