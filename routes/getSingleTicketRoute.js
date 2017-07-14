// Express
const express = require('express');
// Utility func and route func
const mylib = require('../lib/lib');

// Have to use var here, as we need to use them or plan to use them in proxyquire in testing.
var accessToken = '';
var ticketId = '';

// receive express app
module.exports = function (app) {
  // Force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/tickets', route);

  // /tickets/:id
  // If we forget async keyword, await mylib will complain Unexpected identifier
  route.get('/:id', async (req, res) => {
    let errMsg = '';

    // Cookie has access token
    if (req.query !== undefined) {
      if (req.query.myAccessToken !== undefined) {
        // Now get token and get ticket id
        console.log('-- get single ticket --');
        const myAccessToken = req.query.myAccessToken;
        ticketId = req.params.id;
        let singleTicket = '';

        try {
          // With token and ticket id, get the ticket obj.
          singleTicket = await mylib.getSingleTicket(myAccessToken, ticketId);
        } catch (e) {
          console.log('-- catch error --');
          console.log(e);

          // Error, then we need to clean up the cookie and back to home page
          // Home page will init this step: getAccessCode -> GetAccessToken -> ListTickets
          // res.clearCookie('accessToken');
          res.redirect(`/?myAccessToken=${myAccessToken}`);
          // need to stop this route immediately.
          return;
        }

        // Display a single ticket in html
        res.render('singleTicket', { singleTicket, myAccessToken });
      } else {
        // ....
        errMsg = 'get single ticket, no access token';
        console.log(errMsg);
        res.render('errorPage', { errMsg });
      }
    } else {
      // ....
      errMsg = 'get single ticket, no access token';
      console.log(errMsg);
      res.render('errorPage', { errMsg });
    }
  });
};
