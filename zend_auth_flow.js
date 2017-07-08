const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8015;

const querystring = require('querystring');
const my_zend_root_url = 'https://kenpeter4444.zendesk.com';
const client_id = "zend_auth_flow";
const redirect_uri = "http://localhost:8080/handle_user_decision";

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// create routes
app.get('/', function(req, res) {
  // req for read, res for write cookie
  if(req.cookies.owat != undefined) {
    console.log('has cookie');
    res.render('index');
  }
  else {
    console.log('no cookie');

    // 568769006d674d85b213d1c78e4c0c4484a51bbbff007e0f1e18fb3e6c1af77c
    const read_write = encodeURIComponent('read write');
    // we don't speicify redirect uri here, as we already have it in zendesk interface
    const auth_new = `${my_zend_root_url}/oauth/authorizations/new?response_type=code&client_id=${client_id}&scope=${read_write}`;
    res.redirect(auth_new);
  }

});

app.get('/handle_user_decision', function(req, res) {
  // we have code or error
  if(req.query.code != undefined) {
    console.log(req.query.code);
    res.cookie('owat', req.query.code);
    // Need to post and get token

  }
  else {
    //
  }

  res.send({set_success: true});

});



app.get('/clean_cookie', function(req, res) {
  res.clearCookie('owat');
  res.send({clean_success: true});
});


// tell the application to listen on port 3000
app.listen(port);
console.log(`listening to port: ${port}`);
