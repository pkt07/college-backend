var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Admin Dashboard'
  });
});
router.get('/ping', function (req, res, next) {
  res.json(Date(Date.now()).toString());
});

router.use('/api', require('./apis'));

module.exports = router;