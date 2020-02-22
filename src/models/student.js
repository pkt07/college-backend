const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   	fatherName:{
   		type: String,
      required: true
   	},
   	motherName:{
   		type: String,
      required: true
   	},
   	dob:{
   		type: Date,
        required: true
   	},
    address:{
      type: String,
        required: true
      },
    phone:{
        type: Number,
        required: true
    },
    minor:{
      type:string
    },
    disable:{
      type:string
    },
    pincode:{
     type: Number,
      required: true 
    },
    sex:{
      type:String
    },
    nationality:{
      type:String
    },
    category:{
      type:String
    },
    courseName:{
      type:String
    },
    joiningDate:{
      type:String
    },
    enrollment_id:{
      type:String
    }
});

const StudentApplication =mongoose.model('student', studentSchema, 'student')
module.exports = StudentApplication;
