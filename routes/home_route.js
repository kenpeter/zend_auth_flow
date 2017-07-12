// need express
// not instace
const express = require('express');
const mylib = require('../lib/lib');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  var route = express.Router();

  // now define 1st level
  app.use('/tickets', route);

  // /tickets/:id
  // if we forget async, await mylib will complain Unexpected identifier
  route.get('/:id', async function (req, res) {
    //
    if(req.cookies.access_token != undefined) {
      console.log('-- get single ticket --');
      const access_token = req.cookies.access_token;

      let ticket_id = req.params.id;
      let singleTicket = '';

      try {
        singleTicket = await mylib.getSingleTicket(access_token, ticket_id);
      }
      catch(e) {
        console.log('-- catch error --');
        console.log(e);

        // clean token
        res.clearCookie('access_token');
        res.redirect('/');
        // need to stop this route immediately.
        return;
      }

      res.render('single_ticket', {singleTicket: singleTicket});

    }
    else {
      console.log('get single ticket, no access token');
    }
  });
};
