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
    // req for read cookie, res for write cookie
    if (req.cookies.accessToken !== undefined) {
      console.log('-- at home page and has access token --');
      const accessToken = req.cookies.accessToken;

      // check
      let page = req.query.page;
      if (page === undefined) {
        page = 1;
      }
      console.log(`curr page: ${page}`);

      // note, if you define a var inside try catch block, it won't be visible to the rest.
      let tickets = '';
      try {
        tickets = await mylib.getPagedTickets(accessToken, config.perPage, page);
      } catch (e) {
        console.log('-- catch error --');
        console.log(e);

        // clean token
        res.clearCookie('accessToken');
        res.redirect('/');
        // need to stop this route immediately.
        return;
      }

      // We don't do a try catch block here, as the try catch block above already done the job.
      const totalTicketNum = await mylib.getTotalTicketNum(accessToken);

      // when using in ejs, we don't do allTickets.allTickets
      // we use allTickets straight away.
      const totalPage = Math.ceil(totalTicketNum / config.perPage);
      res.render('index', {
        tickets,
        totalTicketNum,
        perPage: config.perPage,
        page,
        totalPage
      });
    } else {
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
