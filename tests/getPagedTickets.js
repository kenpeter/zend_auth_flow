// Equal stuff
const assert = require('assert');
// Util lib
const mylib = require('../lib/lib');
// Sensitive info
const config = require('../config');

// Somehow we cannot use arrow function here.
// because we are using 'this' keyword.
describe('Test ==== get paged tickets ', function () {
  it(`returns ${config.perPage} tickets`, async function () {
    // Async calls take time, so we need to put more time here.
    this.timeout(15000);
    // Params
    const accessToken = await mylib.getNewToken();
    const page = 1;
    let ticketsObj = await mylib.getPagedTickets(accessToken, config.perPage, page);
    //console.log(ticketsObj.length);

    //
    const msg = `should return ${config.perPage}`;
    // if we get same amount of tickets obj, we say pass.
    assert.equal(ticketsObj.length, config.perPage, msg);
  });
});
