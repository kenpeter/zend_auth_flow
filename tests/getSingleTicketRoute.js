// like require, but with overwrite
const proxyquire = require('proxyquire');

// super test, like request
const supertest = require('supertest');

const should = require('should');

// express lib
const express = require('express');

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
  it('should show the error page, as we do not have the token access code.', (done) => {
    // request with app
    request
      // path
      .get('/tickets/1')
      //
      .end((err, res) => {
        // so we need to install should.js, then res.text.should != undefined
        // otherwise res.text.should will be undefined.

        // If the user decline inputing username and password, it should land on this page.
        res.text.should.match(/get single ticket/);
        done();
      });
  });
});
