const assert = require('assert');
const mylib = require('../lib/lib');
const config = require('../config');

describe('Get total ticket num: ', function() {
  it('returns total number of ticket', function() {
    const access_token = '95189d898c965bf808c2a2f1fd5babf9c8e6f60a4464c8c7782a6ecd2c1fde26';
    const hardcode_ticket_num = 103;
    //const ticket_num = await mylib.getTotalTicketNum(access_token);

    mylib.getTotalTicketNum(access_token).then((ticket_num) => {
      const msg = `It should have total ticket number: ${hardcode_ticket_num}`;
      assert.equal(ticket_num, hardcode_ticket_num, msg);
    });
  });
});
