// need express
// not instace
const express = require('express');
const mylib = require('../lib/lib');
const config = require('../config');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/', route);

  // /
  route.get('/', async (req, res) => {
    if (req.query.myAccessToken !== undefined) {
      console.log('-- at home page and has access token --');
      const myAccessToken = req.query.myAccessToken;

      // check
      let page = req.query.page;
      if (page === undefined) {
        page = 1;
      }
      console.log(`curr page: ${page}`);

      // note, if you define a var inside try catch block, it won't be visible to the rest.
      let tickets = '';
      try {
        tickets = await mylib.getPagedTickets(myAccessToken, config.perPage, page);
      } catch (e) {
        console.log('-- catch error --');
        console.log(e);

        res.redirect('/');
        // need to stop this route immediately.
        return;
      }

      // We don't do a try catch block here, as the try catch block above already done the job.
      const totalTicketNum = await mylib.getTotalTicketNum(myAccessToken);

      // We work out how many pages of tickets we have.
      const totalPage = Math.ceil(totalTicketNum / config.perPage);

      // Render and pass var into it.
      res.render('index', {
        tickets,
        totalTicketNum,
        perPage: config.perPage,
        page,
        totalPage,
        myAccessToken
      });
    } else {
      // No access token at all, redirect to Zendesk api end point and get one.
      console.log('home route, no access token');
      //
      const readWrite = encodeURIComponent('read write');
      const clientId = config.clientId;
      //
      const authNew = `${config.myZendRootUrl}/oauth/authorizations/new?response_type=code&client_id=${clientId}&scope=${readWrite}`;
      res.redirect(authNew);
    }
  });
};
