const {Schema, model} = require('mongoose')

const schema = new Schema( {
    brand: {type: String, required: true},
    paperName: {type: String, required: true, unique: true},
    paperName: {type: String, required: true, unique: true},
    paperName: {type: String, required: true, unique: true},
    dimensions: {
        height: {type: Number, required: true},
        width: {type: Number, required: true}
    }
})

module.exports = model('SheetPaper', schema)