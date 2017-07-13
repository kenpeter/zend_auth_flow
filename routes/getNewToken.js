// need express
// not instace
const express = require('express');
const mylib = require('../lib/lib');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/getNewToken', route);

  route.get('/', async (req, res) => {
    const newToken = await mylib.getNewToken();
    res.send({ newToken });  
  });
};
