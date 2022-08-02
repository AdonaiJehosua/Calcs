const {Schema, model} = require('mongoose')

const schema = new Schema( {
    name: {type: String},
    genre: {type: String, required: true},
    directorId: {type: String}
})

module.exports = model('Movie', schema)