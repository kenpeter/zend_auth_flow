const assert = require('assert');
const mylib = require('../lib/lib');
const config = require('../config');
const mylogger = require('../lib/logger');

describe('Get total ticket num: ', function() {
  it('returns total number of ticket', function() {
    const hardcode_ticket_num = 103;

    mylib.getNewToken()
      .then((access_token) => {
        mylogger.debug('-- token --');
        mylogger.debug(access_token);
        return mylib.getTotalTicketNum(access_token);
      })
      .then((ticket_num) => {
        const msg = `It should have total ticket number: ${hardcode_ticket_num}`;
        assert.equal(ticket_num, hardcode_ticket_num, msg);
      });

  });
});
