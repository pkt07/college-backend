const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    prefix    : {type: String, required: true},
    seq    : { type: Number, default: 0}
    });

var counter = mongoose.model('counterInfo', counterSchema, 'counterInfo');
module.exports = counter;
