// need express
// not instace
const express = require('express');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  var route = express.Router();

  // now define 1st level
  app.use('/clean_cookie', route);

  // /clean_cookie/
  route.get('/', function (req, res) {
    console.log('-- clean access_token in cookie --');
    res.clearCookie('access_token');
    res.send({clean_token: true});  
  });
};
