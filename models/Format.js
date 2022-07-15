const {Schema, model} = require('mongoose')

const schema = new Schema( {
    formatName: {type: String, required: true, unique: true},
    dimensions: {
        longSide: {type: Number, required: true},
        shortSide: {type: Number, required: true}
    },
    area: {type: Number, required: true},

})

module.exports = model('Format', schema)