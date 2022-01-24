/* eslint-disable no-unused-vars */
const testsUtils = require('../tools/testsUtils');
const testsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');
/* eslint-enable no-unused-vars */

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';

describe(`Tests POST /users/ API`, function() {
  describe(`Test POST /users/ API`, function() {

    before((done) => {
      debugSetup('==> remove test user in db');
      testsDbUtils.deleteUser({name : 'M. Test User'})
        .then((deleteUserResp) => {
          debugSetup('UserDeleted : ', deleteUserResp);
          debugSetup('==> done!');
          done();
        })
        .catch((deleteUserError) => {
          debugSetup('Error removing user in db : ', deleteUserError);
          debugSetup('==> failed!');
          done(deleteUserError);
        });
    });

    it('Post user OK', function(done) {
      try {
        const path = globalVersion + "/users/" ;
        const sentBody = {
          name : 'M. Test User'
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

            done();
          });
      } catch (exception) {
        debug('exception: %s', exception.stack);
        expect.fail('it test throws an exception');
        done();
      }
    });
  });

});
