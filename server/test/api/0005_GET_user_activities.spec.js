const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';
const route = '/users/{userId}/activities';

describe(`Tests GET ${route} API`, function() {
  before(TestsDbUtils.beforeTestCommonSetUp);

  after(TestsDbUtils.afterTestCommonClean);

  it(`Get user activities with two activities in db`, function(done) {
    try {
      const userId = TestsDbUtils.createTestUsersAndActivitiesResp.users[1].id;

      const path = globalVersion + '/users/' + userId + '/activities/';
      chai.request(testsUtils.getServer())
        .get(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('array');
          response.body.forEach((activity) => {
            expect(Object.keys(activity)).have.members(['relationship', 'activity']);
            expect(activity.relationship).to.have.property('relationshipId');
            expect(activity.relationship).to.have.property('type');
            expect(activity.relationship).to.have.property('userId');
            expect(activity.relationship).to.have.property('activityId');
          });
          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });

  it(`Get user activities if no activity should return empty array`, function(done) {
    try {
      const userId = TestsDbUtils.createTestUsersAndActivitiesResp.users[0].id;

      const path = globalVersion + '/users/' + userId + '/activities/';
      chai.request(testsUtils.getServer())
        .get(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(0);


          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });
});
