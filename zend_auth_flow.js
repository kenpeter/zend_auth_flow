const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8015;

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
    res.send({auth: true});
  }

});


app.get('/set_cookie', function(req, res) {
  res.cookie('owat', "44444444444444");
  res.send({set_success: true});
});


app.get('/clean_cookie', function(req, res) {
  res.clearCookie('owat');
  res.send({clean_success: true});
});


// tell the application to listen on port 3000
app.listen(port);
console.log(`listening to port: ${port}`);
