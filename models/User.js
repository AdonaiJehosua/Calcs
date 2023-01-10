const {Schema, model} = require('mongoose')

const  schema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: {type: String, required: true},
    email: {type: String, default: ""},
    phone: {type: String, default: ""},
})

module.exports = model('User', schema)