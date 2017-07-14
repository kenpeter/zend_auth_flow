// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest-as-promised');

const should = require('should');

// express lib
const express = require('express');

const mylib = require('../lib/lib');

// ping url
describe('Test: getSingleTicketRoute', () => {
  let app;
  let request;
  let route;

  // before
  beforeEach(() => {
    // express instance
    app = express();
    // need to set ejs
    app.set('view engine', 'ejs');
    //
    route = proxyquire('../routes/getSingleTicketRoute', {});

    // the route needs express
    route(app);

    // why super test needs app as well...
    request = supertest(app);
  });

  // callback func, no name, pass done
  it('should show the error page, as we do not have the token access code.', async function () {
    this.timeout(10000);
    const myres = await request.get('/tickets/1');
    myres.text.should.match(/get single ticket/);
  });

  //
  it('should show ticket 1 content', async function () {
    this.timeout(10000);
    const myAccessToken = await mylib.getNewToken();
    const myres = await request.get(`/tickets/1?myAccessToken=${myAccessToken}`);
    myres.text.should.match(/Sample ticket/);
  });
});
