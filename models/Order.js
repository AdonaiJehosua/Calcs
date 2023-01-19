const {Schema, model, Types} = require('mongoose')

const schema = new Schema( {
    number1c: {type: Number, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    productionType: {type: Types.ObjectId, ref: 'ProductionType'},
    startDate: {type: Date, default: Date.now},
    finishDate: {type: Date, required: true},
    creator: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Order', schema)