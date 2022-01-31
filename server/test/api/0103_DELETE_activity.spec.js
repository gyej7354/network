const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';


describe(`Tests DELETE /activity/{activityId} API`, function() {
  before(TestsDbUtils.beforeTestCommonSetUp);

  after(TestsDbUtils.afterTestCommonClean);

  it('DELETE activity with no relationship OK', function(done) {
    try {
      const partialDone = testsUtils.getPartialDoneFunction(done, 2);

      const activityId = TestsDbUtils.createTestUsersAndActivitiesResp.activities[0].id;
      const path = globalVersion + '/activity/' + activityId;

      chai.request(testsUtils.getServer())
        .delete(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          // TestsDbUtils.popPostedTestRelationshipToDelete({id : response.body.relationshipId, type:response.body.type })
          expect(error).to.be.null;
          expect(response).to.have.status(204);
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(Object.keys(response.body)).have.members([]);
          partialDone();

          const getActivityPath = globalVersion + '/activity/' + activityId;
          chai.request(testsUtils.getServer())
            .get(`${getActivityPath}`)
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


              partialDone();
            });
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });

  it('DELETE activity with 2 relationship OK', function(done) {
    try {
      const partialDone = testsUtils.getPartialDoneFunction(done, 2);

      const activityId = TestsDbUtils.createTestUsersAndActivitiesResp.activities[1].id;
      const path = globalVersion + '/activity/' + activityId;

      chai.request(testsUtils.getServer())
        .delete(`${path}`)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          // TestsDbUtils.popPostedTestRelationshipToDelete({id : response.body.relationshipId, type:response.body.type })
          expect(error).to.be.null;
          expect(response).to.have.status(204);
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(Object.keys(response.body)).have.members([]);
          partialDone();

          const getActivityPath = globalVersion + '/activity/' + activityId;
          chai.request(testsUtils.getServer())
            .get(`${getActivityPath}`)
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

              partialDone();
            });
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });
});
