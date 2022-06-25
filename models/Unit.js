const {Schema, model} = require('mongoose')

const schema = new Schema( {
    fullName: {type: String, required: true, unique: true},
    abbreviatedName: {type: String, required: true, unique: true},


})

module.exports = model('Unit', schema)