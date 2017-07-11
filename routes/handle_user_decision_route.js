//
const express = require('express');
//
const request = require('request');
//
const config = require('../config');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  var route = express.Router();

  // now define 1st level
  app.use('/handle_user_decision', route);

  // /handle_user_decision_route
  route.get('/', function (req, res) {
    // the code coming back from user decision
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
            return;
          }
          else {
            // no access token
          }
        }
      });
    }
    else {
      const err_msg = 'Has no req.query.code. User declines.';
      console.log(err_msg);
      res.render('error_page', {err_msg: err_msg});
    }
  });
};
