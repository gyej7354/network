const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';
const route = '/users/';


describe(`Tests POST ${route} API`, function() {

  before(TestsDbUtils.beforeTestCommonSetUp);

  after(TestsDbUtils.afterTestCommonClean);


  it('Post user OK', function(done) {
    try {
      const path = globalVersion + "/users/";
      const sentBody = {
        name: TestsDbUtils.postedTestUsers[0].name
      };
      chai.request(testsUtils.getServer())
        .post(`${path}`)
        .send(sentBody)
        .end((error, response) => {
          debug('response.body: %s', JSON.stringify(response.body));
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response).to.be.json;
          expect(response.body).to.exist;
          expect(response.body).to.be.an('object');
          expect(Object.keys(response.body)).have.members(['name', 'userId']);
          expect(response.body).to.have.property('name', sentBody.name);
          expect(response.body).to.have.property('userId')
          expect(response.body.userId).to.be.an('string')
          expect(response.body.name).to.equal(TestsDbUtils.postedTestUsers[0].name)

          done();
        });
    } catch (exception) {
      debug('exception: %s', exception.stack);
      expect.fail('it test throws an exception');
      done();
    }
  });


  it('Post existing user should return 422', function(done) {
    try {
      const path = globalVersion + "/users/";
      const sentBody = {
        name: TestsDbUtils.createTestUsersAndActivitiesResp.users[0].name
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
  })


});
