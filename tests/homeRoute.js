// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest');

const should = require('should');

// express lib
const express = require('express');

const mylib = require('../lib/lib');

// ping url
describe('Test: homeRoute', () => {
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
    route = proxyquire('../routes/homeRoute', {});
    // the route needs express
    route(app);

    // why super test needs app as well...
    request = supertest(app);
  });

  // We have to use function here, as we need 'this' keyword
  it('should show the home page', async function () {
    this.timeout(10000);

    const accessToken = await mylib.getNewToken();
  });
});
