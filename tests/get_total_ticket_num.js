const assert = require('assert');
const mylib = require('../lib/lib');
const config = require('../config');

describe('Get total ticket num', function() {
  it('returns total number of ticket', async function() {
    const access_token = '';
    const hardcode_ticket_num = 103;
    const ticket_num = await mylib.getTotalTicketNum(access_token);
    const msg = `It should have total ticket number: ${hardcode_ticket_num}`;

    assert.equal(ticket_num, hardcode_ticket_num, msg);
  });
});
