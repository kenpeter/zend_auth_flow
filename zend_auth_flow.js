// config like username, password, etc
const config = require('./config');

// The backend server
const express = require('express');

// Allow you to connect dir, file path
const path = require('path');

// Server instance
const app = express();

// Allow backend server to use cookie
const cookieParser = require('cookie-parser');

// Server listens to this port.
const port = config.port;

// Home url
const homeRoute = require('./routes/homeRoute');
// Single ticket url
const getSingleTicketRoute = require('./routes/getSingleTicketRoute');
// Handle user decision url
const handleUserDecisionRoute = require('./routes/handleUserDecisionRoute');
// Get new token utility url
const getNewToken = require('./routes/getNewToken');

// The view template engine
app.set('view engine', 'ejs');
// Able to use cookie
app.use(cookieParser());
// Able to serve css, etc
app.use(express.static(path.join(__dirname, '/public')));

// /
homeRoute(app);

// /tickets/:id
getSingleTicketRoute(app);

// /handleUserDecision
handleUserDecisionRoute(app);

// /getNewToken, it is a utility to get a new token
getNewToken(app);

// Now the server is running.
const server = app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

// Export the server.
module.exports = server;
