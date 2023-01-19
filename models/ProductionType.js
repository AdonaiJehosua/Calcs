const {Schema, model} = require('mongoose')

const schema = new Schema( {
    productionType: {type: String, required: true, unique: true},
    description: {type: String, required: true},
})

module.exports = model('ProductionType', schema)