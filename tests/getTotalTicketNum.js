const assert = require('assert');
const mylib = require('../lib/lib');

// somehow we cannot use arrow function here.
// because we are using 'this' keyword.
describe('Get total ticket num: ', function () {
  it('returns total number of ticket', async function () {
    this.timeout(10000);
    // NOTE: Need to hardcode for this, will find a better way to do it.
    const hardcodeTicketNum = 103;
    const accessToken = await mylib.getNewToken();
    const ticketNum = await mylib.getTotalTicketNum(accessToken);

    const msg = `It should have total ticket number: ${hardcodeTicketNum}`;
    assert.equal(ticketNum, hardcodeTicketNum, msg);
  });
});
