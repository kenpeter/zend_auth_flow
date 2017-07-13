// need express
// not instace
const express = require('express');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/cleanCookie', route);

  // /clean_cookie/
  route.get('/', (req, res) => {
    console.log('-- clean accessToken in cookie --');
    res.clearCookie('accessToken');
    res.send({ clean_token: true });
  });
};
