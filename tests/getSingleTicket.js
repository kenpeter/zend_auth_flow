//
const assert = require('assert');
//
const mylib = require('../lib/lib');

// somehow we cannot use arrow function here.
// because we are using 'this' keyword.
describe('Test ==== get a single ticket ', function () {
  it('returns a single ticket obj', async function () {
    // Again, need to extend the time for async
    this.timeout(10000);
    const accessToken = await mylib.getNewToken();
    const ticketId = 1;
    let ticketObj = await mylib.getSingleTicket(accessToken, ticketId);

    //console.log('------------ nothing ----------');
    //console.log(ticketObj);

    // If we are able to get the 1st ticket, then pass
    const msg = `Ticket id should be equal.`;
    assert.equal(ticketObj.id, ticketId, msg);
  });
});
