
const Money = require('../models/money');

const RESPONSE = require('../common/response');

exports.addMoney = (req, res) => {
  let data = {
    type: req.body.type,
    amount: req.body.amount,
    purposeName: req.body.purposeName,
    description: req.body.description,
    studentName:req.body.studentName,
    enrollment_id:req.body.enrollment_id
  };

  var record = new Money(data);
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
exports.moneyList = (req,res) => {
  Money.find({}).then(dt =>{
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
