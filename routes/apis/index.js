const express = require('express');
const router = express.Router();
const student = require('../../src/controller/studentController');
const course = require('../../src/controller/courseController');
const money = require('../../src/controller/moneyController');

router.get('/', function (req, res) {
    res.send("Welcome to APIs")
})

router.post('/addStudent', student.addStudent);
router.post('/getStudent',student.getStudent);
router.post('/editStudent',student.editStudent);
router.post('/deleteStudent',student.deleteStudent);
router.post('/getStudentEnrollment',student.getStudentEnrollment);

router.post('/addCourse', course.addCourse);
router.post('/getCourse', course.getCourse);
router.post('/editCourse',course.editCourse);
router.post('/deleteCourse',course.deleteCourse);

router.post('/addMoney',money.addMoney);
router.post('/moneyList',money.moneyList);

module.exports = router;
