
const Course = require('../models/course');
const RESPONSE = require('../common/response');

exports.addCourse = (req, res) => {
  let data = {
    name: req.body.name,
    fees: req.body.fees,
    availableSeat: req.body.availableSeat,
    duration: req.body.duration,
    courseNotation:req.body.courseNotation,
    subject:req.body.subject
  };
  var record = new Course(data);
  record.save(function (error, data) {
    if (error) {
      res.json({
        response_code: RESPONSE.DATABASE_ERROR,
        response: "Database error"
      });
    } else {
      res.json({
        response_code: RESPONSE.SUCCESS,
        response: "Details submitted Successfully"
      });
    }
  });
};
exports.getCourse = (req,res) => {
  Course.find({}).then(dt =>{
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
exports.editCourse = (req,res) => {
  Course.findByIdAndUpdate(req.body._id, req.body, function (err, coupon) {
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
exports.deleteCourse = (req,res) => {
  Course.findByIdAndRemove(req.body._id, req.body, function (err, coupon) {
    if (err) return next(err);
    res.json(coupon);
  });
}