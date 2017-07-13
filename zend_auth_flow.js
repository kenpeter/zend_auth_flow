// config like username, password, etc
const config = require('./config');

// The backend server
const express = require('express');

// Allow you to connect dir, file path
const path = require('path');

// Server instance
const app = express();

// 
const cookieParser = require('cookie-parser');

const port = config.port;

const homeRoute = require('./routes/homeRoute');
const getSingleTicketRoute = require('./routes/getSingleTicketRoute');
const cleanCookieRoute = require('./routes/cleanCookieRoute');
const handleUserDecisionRoute = require('./routes/handleUserDecisionRoute');
const getNewToken = require('./routes/getNewToken');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// /
homeRoute(app);

// /tickets/:id
getSingleTicketRoute(app);

// /handleUserDecision
handleUserDecisionRoute(app);

// /cleanCookie, it is a utility to clean cookie
cleanCookieRoute(app);

// /getNewToken, it is a utility to get a new token
getNewToken(app);

// Now the server is running.
const server = app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

// Export the server.
module.exports = server;
