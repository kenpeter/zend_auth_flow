const config = require('./config');

const express = require('express');

const path = require('path');

const app = express();

const cookieParser = require('cookie-parser');

const port = config.port;

const myZendRootUrl = config.myZendRootUrl;

const clientId = config.clientId;

const mylib = require('./lib/lib');

const getSingleTicketRoute = require('./routes/getSingleTicketRoute');
const cleanCookieRoute = require('./routes/cleanCookieRoute');
const handleUserDecisionRoute = require('./routes/handleUserDecisionRoute');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


// create routes
// remember to put async here
app.get('/', async (req, res) => {
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
      res.clearCookie('access_token');
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
    console.log('no access token');
    //
    const readWrite = encodeURIComponent('read write');
    //
    const authNew = `${myZendRootUrl}/oauth/authorizations/new?response_type=code&client_id=${clientId}&scope=${readWrite}`;
    res.redirect(authNew);
  }
});

// /tickets/:id
getSingleTicketRoute(app);

// /handle_user_decision
handleUserDecisionRoute(app);

// /clean_cookie, it is a utility to clean cookie
cleanCookieRoute(app);


// tell the application to listen on port 3000
const server = app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

module.exports = server;
