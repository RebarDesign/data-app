var express = require('express');
var router = express.Router();

var publishData = require('./assets/publish.json');
var reachData = require('./assets/reach.json');

router.route('/published')
  .get(function (req, res) {
    res.json(publishData);
  })
  .post(function(req, res) {
          // TODO change publish data in file
          publishData.push(req.body);
          res.json({responde: 'Published item created', status:"200"});
  })
  
router.route('/published/:publish_id')
  .get(function(req, res) {
          var publishId = req.params.publish_id;
          var response = [];
          var i;
          
          for(i = 0; i < publishData.length; i++){
              if(publishData[i].id == publishId) {
                  response = publishData[i];
              }
          }
          res.json({res:response, status: "200"});
  });

router.route('/reach')
  .get(function (req, res) {
    res.json(reachData);
  });

module.exports = router;