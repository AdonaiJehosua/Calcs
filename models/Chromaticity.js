const {Schema, model} = require('mongoose')

const schema = new Schema( {
    name: {type: String},
    front: {type: Number, required: true},
    back: {type: Number, required: true},
})

module.exports = model('Chromaticity', schema)