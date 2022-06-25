const {Schema, model} = require('mongoose')

const schema = new Schema( {
    formatName: {type: String, required: true, unique: true},
    dimensions: {
        height: {type: Number, required: true},
        width: {type: Number, required: true}
    }
})

module.exports = model('Format', schema)