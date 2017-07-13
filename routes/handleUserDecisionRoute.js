// Express
const express = require('express');
// Http request
const request = require('request');
// Many sensitive info
const config = require('../config');

// Receive express app
module.exports = function (app) {
  // force router coming out of express.
  const route = express.Router();

  // now define 1st level
  app.use('/handleUserDecision', route);

  // /handleUserDecision
  route.get('/', (req, res) => {
    // the access code coming back from user decision, after the user input username and password
    if (req.query.code !== undefined) {
      //
      const code = req.query.code;

      // The access code is different each time
      // access token is the same in short amount of time.
      console.log('-- access code --');
      console.log(code);

      // Url to get a token
      const getTokenUrl = `${config.myZendRootUrl}/oauth/tokens`;

      // Need to post and get token
      const jsonDataObj = {
        grant_type: 'authorization_code',
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        scope: 'read'
      };

      // Ask access token
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

          // We have token
          if (accessToken) {
            // remember token
            res.cookie('accessToken', accessToken);

            console.log('-- access token --');
            console.log(accessToken);

            // Rediect to listing ticket page, as we have access token
            res.redirect('/');
            console.log('-- redirect to home page --');
            return;
          }
        }
      });
    } else {
      // Show error page.
      const errMsg = 'Has no req.query.code. User declines.';
      console.log(errMsg);
      res.render('errorPage', { errMsg });
    }
  });
};
