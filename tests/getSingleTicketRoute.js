// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest-as-promised');

const should = require('should');

// express lib
const express = require('express');

const mylib = require('../lib/lib');

// ping url
describe('Test ==== getSingleTicketRoute ', () => {
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

  // NOTE: If you access http://localhost:8015/tickets/4?myAccessToken=xxxxxxxxx
  // It will work well.
  // If you access http://localhost:8015/tickets/4 (without the token), it will show no access token error
  // Originally, I store access token in cookie, but there is no easy way to use it in unit test.
  // Append access token to url, allow me to easily test the route.
  it('should show the error page, as we do not have the token access code.', async function () {
    this.timeout(10000);
    const myres = await request.get('/tickets/1');
    myres.text.should.match(/no access token/);
  });

  //
  it('should show the error page, ticket id is not a positive number', async function () {
    this.timeout(10000);
    const myAccessToken = await mylib.getNewToken();
    const myres = await request.get(`/tickets/xyz?myAccessToken=${myAccessToken}`);
    myres.text.should.match(/Not a positive number/);
  });

  //
  it('should show the error page, ticket id is not in range', async function () {
    this.timeout(10000);
    const myAccessToken = await mylib.getNewToken();
    const myres = await request.get(`/tickets/9999?myAccessToken=${myAccessToken}`);
    myres.text.should.match(/Ticket id not in range/);
  });

  //
  it('should show ticket 1 content', async function () {
    this.timeout(18000);
    const myAccessToken = await mylib.getNewToken();
    const myres = await request.get(`/tickets/1?myAccessToken=${myAccessToken}`);
    myres.text.should.match(/Sample ticket/);
  });
});
