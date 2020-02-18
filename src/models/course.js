const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   	duration:{
   		type: Number,
        required: true
   	},
   	fees:{
   		type: Number,
        required: true
   	},
   	availableSeat:{
   		type: Number,
        required: true
	   },
	   courseNotation:{
		   type:String,
		   required:true
	   }
});

const courseApplication =mongoose.model('course', courseSchema, 'course')
module.exports = courseApplication;
