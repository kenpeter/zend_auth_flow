// like require, but with overwrite
var proxyquire = require('proxyquire');

// sinon, basically, create dummy code.
var sinon = require('sinon');

// super test, like request
var supertest = require('supertest');

// expect something...
var expect = require('chai').expect;

// express lib
var express = require('express');

// ping url
describe('GET /ping', function () {
  var app;
  var getUserStub;
  var request
  var route;

  // before
  beforeEach(function () {
    // express instance
    app = express();

    //
    route = proxyquire('../routes/clean_cookie_route', {

    });

    // the route needs express
    route(app);

    // why super test needs app as well...
    request = supertest(app);
  });

  // it is 404
  // callback func, no name, pass done
  it('should respond with 200 and clean_token true', function (done) {

    // request with app
    request
      // path
      .get('/clean_cookie')
      // 200
      .expect(200, function (err, res) {
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
