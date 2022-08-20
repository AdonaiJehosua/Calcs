const {Schema, model, Types} = require('mongoose')

const  schema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
})

module.exports = model('User', schema)