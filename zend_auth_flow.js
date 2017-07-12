const config = require('./config');

const express = require('express');

const path = require('path');

const app = express();

const cookieParser = require('cookie-parser');

const port = config.port;

const homeRoute = require('./routes/homeRoute');
const getSingleTicketRoute = require('./routes/getSingleTicketRoute');
const cleanCookieRoute = require('./routes/cleanCookieRoute');
const handleUserDecisionRoute = require('./routes/handleUserDecisionRoute');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// /
homeRoute(app);

// /tickets/:id
getSingleTicketRoute(app);

// /handleUserDecision
handleUserDecisionRoute(app);

// /clean_cookie, it is a utility to clean cookie
cleanCookieRoute(app);

// liten to a port
const server = app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

module.exports = server;
