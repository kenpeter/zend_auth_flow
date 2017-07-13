const config = {};

// Port
config.port = 8015;
// The Zendesk root end point
config.myZendRootUrl = 'https://kenpeter4444.zendesk.com';
// The name of my app
config.clientId = 'zend_auth_flow';
// Redirect the user, when done input username and password
config.redirectUri = `http://localhost:${config.port}/handleUserDecision`;

// My app's password
config.clientSecret = '568769006d674d85b213d1c78e4c0c4484a51bbbff007e0f1e18fb3e6c1af77c';
// Display 25 tickets each page
config.perPage = 25;
// The email you need to login
config.emailAddress = 'figo2478@gmail.com';
// The password you need to login
config.password = 'Kenpeter4444!';
// My little app's id in Zendesk
config.clientIdNumber = '114093958794';

//
module.exports = config;
