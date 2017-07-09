const config = require('../config');
const request = require('request');

exports.getAllTickets = function getAllTickets(access_token) {
  return new Promise(function (resolve, reject) {
    //
    const all_ticket_url = config.my_zend_root_url + "/api/v2/tickets.json";
    //
    const my_auth = ` Bearer ${access_token}`;

    const options = {
      url: all_ticket_url,
      headers: {
        'Authorization': my_auth
      }
    };

    //
    request.get(options, function(error, response, body) {
      if (error) {
        console.log('-- error, getAllTickets --');
        console.log(error);
        reject(error);
      }
      else {
        let bodyObj = JSON.parse(body);
        let tickets = bodyObj.tickets;

        //console.log('-- good, getAllTickets --');
        //console.log(tickets);

        resolve(tickets);
      }
    });


  });
}



exports.getSingleTicket = function getAllTickets(access_token, ticket_id) {
  return new Promise(function (resolve, reject) {
    //
    const single_ticket_url = config.my_zend_root_url + `/api/v2/tickets/${ticket_id}.json`;
    //
    const my_auth = ` Bearer ${access_token}`;

    const options = {
      url: single_ticket_url,
      headers: {
        'Authorization': my_auth
      }
    };

    //
    request.get(options, function(error, response, body) {
      if (error) {
        console.log('-- error, getSingleTicket --');
        console.log(error);
        reject(error);
      }
      else {
        let bodyObj = JSON.parse(body);
        let ticket = bodyObj.ticket;

        //console.log('-- good, getAllTickets --');
        //console.log(tickets);

        resolve(ticket);
      }
    });


  });
}
