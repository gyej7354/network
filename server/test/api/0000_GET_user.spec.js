const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';
const route = '/users/{userId}';

describe(`Tests GET ${route} API`, function() {

  before(TestsDbUtils.beforeTestCommonSetUp);

  after(TestsDbUtils.afterTestCommonClean);

  it(`Get user OK`, function(done) {
    try {
      let userId = TestsDbUtils.createTestUsersAndActivitiesResp.users[0].id;
      let expectedUserName = TestsDbUtils.createTestUsersAndActivitiesResp.users[0].name;

      const path = globalVersion + '/users/' + userId;
      chai.request(testsUtils.getServer())
        .get(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body.userId).to.equal(userId);
          expect(response.body.name).to.equal(expectedUserName);
          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });

  it(`Get unknown user OK returns 404`, function(done) {
    try {
      const path = globalVersion + '/users/' + 'unkownUserId';
      chai.request(testsUtils.getServer())
        .get(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));

          expect(error).to.be.null;
          expect(response).to.have.status(404);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('internalErrorCode', 404);
          expect(response.body).to.have.property('message', 'Resource not found');
          expect(response.body).to.have.property('description', 'The requested URI or the requested resource does not exist.');

          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });

});
