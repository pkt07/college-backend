const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moneySchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    enrollment_id: {
        type: String
    },
    studentName:{
        type: String
    },
    purposeName:{
        type:String
    }
},{
      timestamps: {
          createdAt: true,
          updatedAt: true
      }
});

const moneyApplication = mongoose.model('money', moneySchema, 'money');
module.exports = moneyApplication;
