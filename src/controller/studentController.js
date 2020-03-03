
const Student = require('../models/student');
const CounterInfo = require('../models/counter');
const RESPONSE = require('../common/response');
const Course = require('../models/course');

exports.addStudent = async(req, res) => {
  let joinYear = req.body.joiningDate.substring(0,4);
  const A = await CounterInfo.findOne({prefix:"rollCounter"});
  const B = await Course.findOne({"name":req.body.courseName});
  let data = {
    name: req.body.name,
    fatherName:req.body.fatherName,
    motherName:req.body.motherName,
    dob:req.body.dob,
    phone:req.body.phone,
    address:req.body.address,
    pincode:req.body.phone,
    sex:req.body.sex,
    category:req.body.category,
    nationality:req.body.nationality,
    courseName:req.body.courseName,
    joiningDate:req.body.joiningDate,
    minor:req.body.minor,
    disable:req.body.disable,
    adhar:req.body.adhar,
    subject:req.body.subject,
    enrollment_id:joinYear+B.courseNotation+A.seq
  };
  var record = new Student(data);
  record.save(async function (error, data) {
    if (error) {
      res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "Database error"
      });
    } else {
      const data = await CounterInfo.findOneAndUpdate({
        prefix: "rollCounter"
      }, {
        $inc: {
          seq: 1
        }
      }, {
        upsert: true,
        new: true
      });
      if(data)
      res.json({
        response_code: RESPONSE.SUCCESS,
        response: "Student Registered Successfully" 
      });
      else{
      res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "Database error"
      });
      return 0;
    }
    }
  });
};
exports.getStudent = (req,res) => {
  Student.find({}).then(dt =>{
    if(dt.length>0)
    {
       res.json({
        response_code: RESPONSE.SUCCESS,
        response: dt
      });
    }
    else{
      res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "No Data Found"
      });
    }
  })
}
exports.getStudentEnrollment = (req,res) => {
  Student.find({}).select({'enrollment_id':true,'name':true,'_id':false}).then(dt =>{
    if(dt.length>0)
    {
       res.json({
        response_code: RESPONSE.SUCCESS,
        response: dt
      });
    }
    else{
      res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "No Data Found"
      });
    }
  })
}

exports.editStudent = (req,res) => {
  Student.findByIdAndUpdate(req.body._id, req.body, function (err, coupon) {
    if (err){
       res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "Database error"
      });
    }
    else{
      res.json({
        response_code: RESPONSE.SUCCESS,
        response: coupon
      })
    }
  });
}
exports.deleteStudent = (req,res) => {
  Student.findByIdAndRemove(req.body._id, req.body, function (err, coupon) {
   if (err){
       res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "Database error"
      });
    }
    else{
      res.json({
        response_code: RESPONSE.SUCCESS,
        response: "deleted"
      })
    }
  });
}