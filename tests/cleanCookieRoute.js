// like require, but with overwrite
const proxyquire = require('proxyquire');

//const should = require('should');

// super test, like request
const supertest = require('supertest');

// expect something...
const expect = require('chai').expect;

// express lib
const express = require('express');

// ping url
describe('Test: cleanCookieRoute', () => {
  let app;
  let request;
  let route;

  // before
  beforeEach(() => {
    // express instance
    app = express();
    //
    route = proxyquire('../routes/cleanCookieRoute', {});
    // the route needs express
    route(app);
    // why super test needs app as well...
    request = supertest(app);
  });

  // callback func, no name, pass done
  it('should respond with 200 and clean_token true', (done) => {

    // request with app
    request
      // path
      .get('/cleanCookie')
      // 200
      .expect(200, (err, res) => {
        // callback
        // res.body
        // to.deep.equal
        expect(res.body).to.deep.equal({
          // obj
          clean_token: true //
        });
        //
        done();
      });
  });
});
