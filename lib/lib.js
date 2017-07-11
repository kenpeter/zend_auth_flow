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
        //
        let bodyObj = JSON.parse(body);

        if(bodyObj.error != undefined) {
          // there is an error
          if(bodyObj.error == 'invalid_token')
          {
            console.log('-- invalid token --');
            reject({error: 'invalid_token'});
          }
          else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({error: 'unknown_error'});
          }
        }
        else {
          // body contains no error
          let tickets = bodyObj.tickets;

          //test
          console.log('-- tickets we have --');
          console.log(tickets);

          resolve(tickets);
        }
      }
    });
  });
}


exports.getPagedTickets = function getPagedTickets(access_token, per_page, page) {
  return new Promise(function (resolve, reject) {

    let tickets = '';

    //test
    // invalid the token
    //access_token = access_token + "444";

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
        //
        let bodyObj = JSON.parse(body);

        if(bodyObj.error != undefined) {
          // there is an error
          if(bodyObj.error == 'invalid_token')
          {
            console.log('-- invalid token --');
            reject({error: 'invalid_token'});
          }
          else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({error: 'unknown_error'});
          }
        }
        else {
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
        /*
        let bodyObj = JSON.parse(body);
        let ticket = bodyObj.ticket;

        //console.log('-- good, getAllTickets --');
        //console.log(tickets);

        resolve(ticket);
        */

        //
        let bodyObj = JSON.parse(body);

        if(bodyObj.error != undefined) {
          // there is an error
          if(bodyObj.error == 'invalid_token')
          {
            console.log('-- invalid token --');
            reject({error: 'invalid_token'});
          }
          else {
            // not sure how to handle this error
            console.log('-- unknown_error --');
            reject({error: 'unknown_error'});
          }
        }
        else {
          // body contains no error
          ticket = bodyObj.ticket;

          resolve(ticket);
        }

      }
    });
  });
}


exports.getTotalTicketNum = function getTotalTicketNum(access_token) {
  return new Promise(function (resolve, reject) {
    // Human time (GMT): Friday, 9 June 2017 16:21:01
    const unix_time = 1497025261;
    //
    const url = config.my_zend_root_url + `/api/v2/incremental/tickets.json?start_time=${unix_time}`;
    //
    const my_auth = ` Bearer ${access_token}`;

    const options = {
      url: url,
      headers: {
        'Authorization': my_auth
      }
    };

    //
    request.get(options, function(error, response, body) {
      if (error) {
        console.log('-- error, getTotalTicketNum --');
        console.log(error);
        reject(error);
      }
      else {
        let bodyObj = JSON.parse(body);

        let count = bodyObj.count;
        console.log('-- good, getTotalTicketNum --');
        console.log(count);

        resolve(count);
      }
    });
  });
}
