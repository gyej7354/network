/* eslint-disable no-unused-vars */
const testsUtils = require('../tools/testsUtils');
const testsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');
/* eslint-enable no-unused-vars */

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';
const route = '/users';

describe(`Tests GET ${route} API OK`, function() {
    before((done) => {
      debugSetup('==> remove all users in db');
      testsDbUtils.deleteAllUsers({})
        .then((removeAllUsersResp) => {
          debugSetup('All users in db are removed : ', removeAllUsersResp);
          debugSetup('==> done!');



          testsDbUtils.createUser({name :  'M. Test User'})
            .then((createUserResp) => {
              debugSetup('One user created : ', createUserResp);
              debugSetup('==> done!');

              done();
            })
            .catch((createUserError) => {
              debugSetup('Error creating users in db : ', createUserError);
              debugSetup('==> failed!');
              done(createUserError);
            });

        })
        .catch((removeAllUsersError) => {
          debugSetup('Error removing users in db : ', removeAllUsersError);
          debugSetup('==> failed!');
          done(removeAllUsersError);
        });
    });

    it(`Get users OK with one user in DB`, function(done) {
      try {
        const path = globalVersion + '/users/';
        chai.request(testsUtils.getServer())
          .get(`${path}`)
          .end((error, response) => {
            debug('response.body: %s', JSON.stringify(response.body));
            expect(error).to.be.null;
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            expect(response.body).to.exist;
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(1);
            done();
          });
      } catch (exception) {
        debug('exception: %s', exception.stack);
        expect.fail('it test throws an exception');
        done();
      }
    });

});
