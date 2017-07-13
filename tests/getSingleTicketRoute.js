/*
// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest');

const should = require('should');

// express lib
const express = require('express');

//
const mylib = require('../lib/lib');

//
describe('Test: getSingleTicketRoute', () => {
  let app;
  let request;
  let route;
  let accessTokenStub = '';
  let ticketIdStub = '';

  // before
  beforeEach(() => {
    // express instance
    app = express();
    // need to set ejs
    app.set('view engine', 'ejs');
    //
    route = proxyquire('../routes/getSingleTicketRoute', {
      accessToken: accessTokenStub,
      ticketId: ticketIdStub
    });
    route(app);
  });

  // callback func, no name, pass done
  it('should get a single ticket', async function (done) {
    this.timeout(10000);

    const accessToken = await mylib.getNewToken();
    accessTokenStub = accessToken;
    ticketIdStub = 1;

    route();
  });
});
*/
