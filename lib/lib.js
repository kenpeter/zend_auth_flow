// Sensitive info
const config = require('../config');
// Http request
const request = require('request');

// Get all tickets, this func hasn't been used yet.
// But we can easily define a route and get all the tickets.
exports.getAllTickets = function getAllTickets(accessToken) {
  // In case, you don't know promise. Promise is e.g.
  // You call your mum, and you hit a voice message. Msg say she will call you back sometime
  // But you just don't know when. Maybe tomororw or next year, you don't know.
  return new Promise((resolve, reject) => {
    // All ticket url
    const allTicketUrl = `${config.myZendRootUrl}/api/v2/tickets.json`;
    // For header
    const myAuth = ` Bearer ${accessToken}`;

    // Params to pass
    const options = {
      url: allTicketUrl,
      headers: {
        Authorization: myAuth
      }
    };

    //
    request.get(options, (error, response, body) => {
      // Handle error.
      if (error) {
        console.log('-- error, getAllTickets --');
        console.log(error);
        reject(error);
      } else {
        // Parse, you will be supprised that, sometime you don't need to parse.
        const bodyObj = JSON.parse(body);

        if (bodyObj.error !== undefined) {
          // there is an error about invalid_token
          if (bodyObj.error === 'invalid_token') {
            console.log('-- invalid token --');
            reject({ error: 'invalid_token' });
          } else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({ error: 'unknown_error' });
          }
        } else {
          // body contains no error
          const tickets = bodyObj.tickets;

          //test
          console.log('-- tickets we have --');
          console.log(tickets);

          // Return the obj to use
          resolve(tickets);
        }
      }
    });
  });
};


// Get 25 tickets for each fetching.
exports.getPagedTickets = function getPagedTickets(accessToken, perPage, page) {
  return new Promise((resolve, reject) => {
    let tickets = '';

    const allTicketUrl = `${config.myZendRootUrl}/api/v2/tickets.json?per_page=${perPage}&page=${page}`;
    //
    const myAuth = ` Bearer ${accessToken}`;

    const options = {
      url: allTicketUrl,
      headers: {
        Authorization: myAuth
      }
    };

    //
    request.get(options, (error, response, body) => {
      if (error) {
        console.log('-- error, getPagedTickets --');
        console.log(error);
        reject(error);
      } else {
        //
        const bodyObj = JSON.parse(body);

        if (bodyObj.error !== undefined) {
          // there is an error
          if (bodyObj.error === 'invalid_token') {
            console.log('-- invalid token --');
            reject({ error: 'invalid_token' });
          } else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({ error: 'unknown_error' });
          }
        } else {
          // body contains no error
          tickets = bodyObj.tickets;

          //test
          //console.log('-- tickets we have --');
          //console.log(tickets);

          resolve(tickets);
        }
      }
    });
  });
};

// Get a single ticket
exports.getSingleTicket = function getSingleTicket(accessToken, ticketId) {
  return new Promise((resolve, reject) => {
    //
    const singleTicketUrl = `${config.myZendRootUrl}/api/v2/tickets/${ticketId}.json`;
    //
    const myAuth = ` Bearer ${accessToken}`;

    const options = {
      url: singleTicketUrl,
      headers: {
        Authorization: myAuth
      }
    };

    //
    request.get(options, (error, response, body) => {
      if (error) {
        console.log('-- error, getSingleTicket --');
        console.log(error);
        reject(error);
      } else {
        //
        const bodyObj = JSON.parse(body);

        if (bodyObj.error !== undefined) {
          // there is an error
          if (bodyObj.error === 'invalid_token') {
            console.log('-- invalid token --');
            reject({ error: 'invalid_token' });
          } else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({ error: 'unknown_error' });
          }
        } else {
          // body contains no error
          const ticket = bodyObj.ticket;
          //console.log('-- ticket --');
          //console.log(ticket);
          resolve(ticket);
        }
      }
    });
  });
};

// Get total ticket num
exports.getTotalTicketNum = function getTotalTicketNum(accessToken) {
  return new Promise((resolve, reject) => {
    // Human time (GMT): Friday, 9 June 2017 16:21:01
    const unixTime = 1497025261;
    //
    const url = `${config.myZendRootUrl}/api/v2/incremental/tickets.json?start_time=${unixTime}`;
    //
    const myAuth = ` Bearer ${accessToken}`;

    const options = {
      url,
      headers: {
        Authorization: myAuth
      }
    };

    //
    request.get(options, (error, response, body) => {
      if (error) {
        console.log('-- error, getTotalTicketNum --');
        console.log(error);
        reject(error);
      } else {
        const bodyObj = JSON.parse(body);
        const count = bodyObj.count;
        console.log('-- good, getTotalTicketNum --');
        console.log(count);

        resolve(count);
      }
    });
  });
};

// Gen new token
exports.getNewToken = function getNewToken() {
  return new Promise((resolve, reject) => {
    //
    const url = `${config.myZendRootUrl}/api/v2/oauth/tokens.json`;

    const jsonDataObj = {
      token: {
        client_id: config.clientIdNumber,
        scopes: ['read', 'write']
      }
    };

    request.post({
      url,
      body: jsonDataObj,
      json: true,
      auth: {
        user: config.emailAddress,
        password: config.password
      }
    }, (error, response, body) => {
      if (error) {
        console.log('-- error --');
        console.log(error);
        reject(error);
      } else {
        // NOTE: we don't need to parse the token... ok very inconsistent......
        if (body.token.full_token !== undefined) {
          console.log('-- good, getNewToken --');
          console.log(body.token.full_token);
          resolve(body.token.full_token);
        } else {
          reject({ full_token: false });
        }
      }
    }); // end callback
  });
};
