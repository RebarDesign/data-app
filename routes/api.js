var express = require('express');
var router = express.Router();

var publishData = require('./assets/publish.json');
var reachData = require('./assets/reach.json');

router.get('/published', function (req, res) {
  res.json(publishData);
});

router.get('/reach', function (req, res) {
  res.json(reachData);
});


module.exports = router;