const {Schema, model, Types} = require('mongoose')

const schema = new Schema( {
    order: {type: Types.ObjectId, ref: 'Order'},
    user: {type: Types.ObjectId, ref: 'User'},
    status: {type: String},
    date: {type: Date, default: Date.now}
})

module.exports = model('OrderEvent', schema)