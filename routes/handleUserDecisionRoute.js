//
const express = require('express');
//
const request = require('request');
//
const config = require('../config');

// receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/handleUserDecision', route);

  // /handleUserDecision
  route.get('/', (req, res) => {
    // the code coming back from user decision
    if (req.query.code !== undefined) {
      const code = req.query.code;

      // the access code is different each time
      // access token can be the same in that amount of time.
      console.log('-- access code --');
      console.log(code);

      const getTokenUrl = `${config.my_zend_root_url}/oauth/tokens`;

      // Need to post and get token
      const jsonDataObj = {
        grant_type: 'authorization_code',
        code,
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uri: config.redirect_uri,
        scope: 'read'
      };

      request.post({
        url: getTokenUrl,
        body: jsonDataObj,
        json: true
      }, (error, response, body) => {
        if (error) {
          console.log('-- error --');
          console.log(error);
        } else {
          const accessToken = body.access_token;

          if (accessToken) {
            // remember token
            res.cookie('accessToken', accessToken);
            // res.send({set_success: true});

            console.log('-- access token --');
            console.log(accessToken);

            // rediect to listing ticket page, as we have access token
            res.redirect('/');
            console.log('-- redirect to home page --');
            return;
          }
        }
      });
    } else {
      const errMsg = 'Has no req.query.code. User declines.';
      console.log(errMsg);
      res.render('errorPage', { errMsg });
    }
  });
};
