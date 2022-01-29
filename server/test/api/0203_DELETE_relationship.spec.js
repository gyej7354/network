const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';


describe(`Tests DELETE /relationship/{relationshipId} API`, function() {
  before(TestsDbUtils.beforeTestCommonSetUp);

  after(TestsDbUtils.afterTestCommonClean);

  it('DELETE relationship OK', function(done) {
    try {
      const partialDone = testsUtils.getPartialDoneFunction(done, 2);

      const relationshipId = TestsDbUtils.createTestRelationshipsResp[0].id;
      const path = globalVersion + '/relationship/' + relationshipId;

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

          const user2Id = TestsDbUtils.createTestUsersAndActivitiesResp.users[1].id;
          const getUserActivitiesPath = globalVersion + '/users/' + user2Id + '/activities/';
          chai.request(testsUtils.getServer())
            .get(`${getUserActivitiesPath}`)
            .end((error, response) => {
              debug('response.body: %s', JSON.stringify(response.body));
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              expect(response).to.be.json;
              expect(response.body).to.exist;
              expect(response.body).to.be.an('array');

              expect(response.body.length).to.equal(1);

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
