// express
const express = require('express');

// We pass the express instance into it.
module.exports = function (app) {
  // Force router coming out of express.
  const route = express.Router();

  // Now define 1st level
  app.use('/cleanCookie', route);

  // /clean_cookie/
  route.get('/', (req, res) => {
    // Clean cookie and output json obj to webpage.
    console.log('-- clean accessToken in cookie --');
    res.clearCookie('accessToken');
    res.send({ clean_token: true });
  });
};
