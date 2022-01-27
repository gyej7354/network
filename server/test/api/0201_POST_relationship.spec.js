const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');
const chai = require('chai');
const expect = require('chai').expect;
const config = require('../../config');

const globalVersion = '/api/v1';
const route = '/relationship/';


describe(`Tests POST /relationship/ API`, function() {

    before(TestsDbUtils.beforeTestCommonSetUp);

    after(TestsDbUtils.afterTestCommonClean);

  it('Post relationship OK', function(done) {
    try {
      const path = globalVersion + "/relationship/";
      const sentBody = {
        type: config.RELATIONSHIP_LIKES,
        userId: TestsDbUtils.createTestUsersAndActivitiesResp.users[0].id,
        activityId: TestsDbUtils.createTestUsersAndActivitiesResp.activities[0].id
      };
      chai.request(testsUtils.getServer())
        .post(`${path}`)
        .send(sentBody)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          TestsDbUtils.pushPostedTestRelationshipToDelete({id : response.body.relationshipId, type:response.body.type })
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(Object.keys(response.body)).have.members(['relationshipId', 'type', 'userId', 'activityId']);

          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });

  it('Post existing relationship should return 422', function(done) {
    try {
      const path = globalVersion + "/relationship/";
      const sentBody = {
        type: TestsDbUtils.createTestRelationshipsResp[0].type,
        userId: TestsDbUtils.createTestRelationshipsResp[0].userId,
        activityId: TestsDbUtils.createTestRelationshipsResp[0].activityId
      };
      chai.request(testsUtils.getServer())
        .post(`${path}`)
        .send(sentBody)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          expect(error).to.be.null;
          expect(response).to.have.status(422);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('internalErrorCode', 422);
          expect(response.body).to.have.property('message', 'Conflict');
          expect(response.body).to.have.property('description', 'This object already exists.');

          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });



});
