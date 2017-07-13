const assert = require('assert');
const mylib = require('../lib/lib');
const config = require('../config');

// somehow we cannot use arrow function here.
// because we are using 'this' keyword.
describe('Get paged tickets: ', function () {
  it(`returns ${config.perPage} tickets`, async function () {
    this.timeout(10000);
    const accessToken = await mylib.getNewToken();
    const page = 1;
    let ticketsObj = await mylib.getPagedTickets(accessToken, config.perPage, page);

    //console.log(ticketsObj.length);

    const msg = `should return ${config.perPage}`;
    assert.equal(ticketsObj.length, config.perPage, msg);
  });
});
