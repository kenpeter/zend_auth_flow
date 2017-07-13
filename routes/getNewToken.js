// express
const express = require('express');
// mylib contains many utility or route functions.
const mylib = require('../lib/lib');

// Receive express app instance
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // Now define 1st level
  app.use('/getNewToken', route);

  route.get('/', async (req, res) => {
    // Get the brand new token and output json obj to webpage.
    const newToken = await mylib.getNewToken();
    res.send({ newToken });
  });
};
