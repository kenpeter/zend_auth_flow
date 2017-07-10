const config = require('./config');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = config.port;
const querystring = require('querystring');
const my_zend_root_url = config.my_zend_root_url;
const client_id = config.client_id;

const redirect_uri = config.redirect_uri;
const request = require('request');
const mylib = require('./lib/lib');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


// create routes
// remember to put async there
app.get('/', async function(req, res) {
  // req for read, res for write cookie
  if(req.cookies.access_token != undefined) {
    console.log('-- has access token --');
    const access_token = req.cookies.access_token;

    // check
    let page = req.query.page;
    if(page) {

    }
    else {
      // default first page
      page = 1;
    }
    console.log("curr page: " + page);

    /*
    try {
      let tickets = await mylib.getAllTickets(access_token);
      //let tickets = await mylib.getPagedTickets(access_token, config.per_page, page);
    }
    catch(e) {
      console.log("-- catch error --");
      console.log(e);

      console.log('-- clean token --');
      res.clearCookie('access_token');
      res.redirect('/');
    }
    */

    let tickets = await mylib.getPagedTickets(access_token, config.per_page, page);
    // need to get total page each time, as we don't know whether someone will add more tickets for you.
    let total_ticket_num = await mylib.getTotalTicketNum(access_token);

    // when using in ejs, we don't do allTickets.allTickets
    // we use allTickets straight away.
    let total_page = Math.ceil(total_ticket_num / config.per_page);
    res.render('index', {tickets: tickets, page: page, total_page: total_page});
  }
  else {
    console.log('no access token');
    //
    const read_write = encodeURIComponent('read write');
    // we don't speicify redirect uri here, as we already have it in zendesk interface
    // go to get new token page
    // if we already ask new token before and token still valid, we will go straight to redirect
    // otherwise it will go to authorization enable page
    const auth_new = `${my_zend_root_url}/oauth/authorizations/new?response_type=code&client_id=${client_id}&scope=${read_write}`;
    res.redirect(auth_new);
  }

});

app.get('/tickets/:id', async function(req, res) {
  if(req.cookies.access_token != undefined) {
    console.log('-- access token --');
    const access_token = req.cookies.access_token;

    let ticket_id = req.params.id;

    // get all tickets
    let singleTicket = await mylib.getSingleTicket(access_token, ticket_id);

    //console.log('-- single ticket --');
    //console.log(singleTicket);

    res.render('single_ticket', {singleTicket: singleTicket});

  }
  else {
    console.log('no access token');

  }
});


app.get('/handle_user_decision', function(req, res) {
  // we have code or error
  if(req.query.code != undefined) {
    const code = req.query.code;

    // the access code is different each time
    // access token can be the same in that amount of time.
    console.log('-- access code --');
    console.log(code);

    const get_token_url = config.my_zend_root_url + "/oauth/tokens";

    // Need to post and get token
    const jsonDataObj = {
      "grant_type": "authorization_code",
      "code": code,
      "client_id": config.client_id,
      "client_secret": config.client_secret,
      "redirect_uri": config.redirect_uri,
      "scope": "read"
    };

    request.post({
      url: get_token_url,
      body: jsonDataObj,
      json: true
    }, function(error, response, body) {
      /*
      console.log('--err--');
      console.log(error);
      console.log('--res--')
      console.log(response);
      console.log('--body--');
      console.log(body);
      */

      // access token
      // 65205bd62aca324120539a87de1de26fd4241da9518d24098bb26b2c277388d4
      if (error) {
        console.log('-- error --');
        console.log(error);
      }
      else {
        const access_token = body.access_token;

        if(access_token) {
          // remember token
          res.cookie('access_token', access_token);
          // res.send({set_success: true});

          console.log('-- access token --');
          console.log(access_token);

          // rediect to listing ticket page, as we have access token
          res.redirect('/');
          console.log('-- redirect to home page --');
        }
        else {

        }
      }
    });

  }
  else {
    //
    console.log('has no req.query.code');
  }
});



app.get('/clean_cookie', function(req, res) {
  console.log('-- clean access_token in cookie --');
  res.clearCookie('access_token');
  res.send({clean_token: true});
});


// tell the application to listen on port 3000
app.listen(port);
console.log(`listening to port: ${port}`);
