// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest-as-promised');

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

  //
  it('should show home page', async function () {
    this.timeout(10000);
    const myAccessToken = await mylib.getNewToken();
    const myres = await request.get(`/?myAccessToken=${myAccessToken}`);
    myres.text.should.match(/Mobile ticket viewer/);
  });
});
