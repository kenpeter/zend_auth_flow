const assert = require('assert');
const mylib = require('../lib/lib');
const config = require('../config');
const mylogger = require('../lib/logger');

describe('Get total ticket num: ', function() {
  it('returns total number of ticket', async function() {
    this.timeout(10000);
    // NOTE: Need to hardcode for this, will find a better way to do it.
    const hardcode_ticket_num = 103;
    const access_token = await mylib.getNewToken();
    const ticket_num = await mylib.getTotalTicketNum(access_token);

    const msg = `It should have total ticket number: ${hardcode_ticket_num}`;
    assert.equal(ticket_num, hardcode_ticket_num, msg);
  });
});
