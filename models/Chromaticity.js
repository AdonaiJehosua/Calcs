const {Schema, model} = require('mongoose')

const schema = new Schema( {
    front: {type: Number, required: true},
    back: {type: Number, required: true},
})

module.exports = model('Chromaticity', schema)