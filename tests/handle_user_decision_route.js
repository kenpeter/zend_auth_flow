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
describe('Test: handleUserDecisionRoute', function () {
  var app;
  var request
  var route;

  // before
  beforeEach(function () {
    // express instance
    app = express();
    // need to set ejs
    app.set('view engine', 'ejs');

    //
    route = proxyquire('../routes/handle_user_decision_route', {

    });

    // the route needs express
    route(app);

    // why super test needs app as well...
    request = supertest(app);
  });

  // callback func, no name, pass done
  it('should respond show error page', function (done) {
    // request with app
    request
      // path
      .get('/handle_user_decision')
      //
      .end(function (err, res) {
        // so we need to install should.js, then res.text.should != undefined
        // otherwise res.text.should will be undefined.
        res.text.should.match(/Has no/)

        done();
      });
  });

});
