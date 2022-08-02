const {Schema, model} = require('mongoose')

const schema = new Schema( {
    name: {type: String},
    age: {type: String, required: true},
})

module.exports = model('Director', schema)