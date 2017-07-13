const assert = require('assert');
const mylib = require('../lib/lib');

// somehow we cannot use arrow function here.
// because we are using 'this' keyword.
describe('Get a single ticket: ', function () {
  it('returns a single ticket obj', async function () {
    this.timeout(10000);
    const accessToken = await mylib.getNewToken();
    const ticketId = 1;
    let ticketObj = await mylib.getSingleTicket(accessToken, ticketId);

    //console.log('------------ nothing ----------');
    //console.log(ticketObj);

    const msg = `Ticket id should be equal.`;
    assert.equal(ticketObj.id, ticketId, msg);
  });
});
