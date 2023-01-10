const {Schema, model} = require('mongoose')

const schema = new Schema( {
    number1c: {type: Number, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    productionType: {type: String, required: true},
    startDate: {type: Date, default: Date.now},
    finishDate: {type: Date, required: true},
    preprintDate: {type: Date},
    printDate: {type: Date},
    postprintDate: {type: Date}
})

module.exports = model('Order', schema)