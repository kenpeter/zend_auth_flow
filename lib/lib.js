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


exports.getPagedTickets = function getPagedTickets(access_token, per_page, page) {
  return new Promise(function (resolve, reject) {
    // per_page, default to 25
    // page=1 or page=2 e.g.
    const all_ticket_url = config.my_zend_root_url + `/api/v2/tickets.json?per_page=${per_page}&page=${page}`;
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
        console.log('-- error, getPagedTickets --');
        console.log(error);
        reject(error);
      }
      else {
        let bodyObj = JSON.parse(body);
        let tickets = bodyObj.tickets;

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
