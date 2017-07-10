//
var request = require('supertest');
var server = require('../zend_auth_flow');

describe('loading express', function () {
  //
  beforeEach(function () {

  });
  //
  afterEach(function () {
    server.close();
  });
  //
  it('responds to /', function testSlash(done) {
    //
    request(server)
      .get('/')
      .expect(200, done);
    });
    //
    it('404 everything else', function testPath(done) {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
    });
});
