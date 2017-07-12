// need express
// not instace
const express = require('express');
const mylib = require('../lib/lib');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/tickets', route);

  // /tickets/:id
  // if we forget async, await mylib will complain Unexpected identifier
  route.get('/:id', async (req, res) => {
    //
    if (req.cookies.accessToken !== undefined) {
      console.log('-- get single ticket --');
      const accessToken = req.cookies.accessToken;

      const ticketId = req.params.id;
      let singleTicket = '';

      try {
        singleTicket = await mylib.getSingleTicket(accessToken, ticketId);
      } catch (e) {
        console.log('-- catch error --');
        console.log(e);

        // clean token
        res.clearCookie('accessToken');
        res.redirect('/');
        // need to stop this route immediately.
        return;
      }

      res.render('singleTicket', { singleTicket });
    } else {
      console.log('get single ticket, no access token');
    }
  });
};
