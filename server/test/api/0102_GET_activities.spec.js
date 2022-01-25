/* eslint-disable no-unused-vars */
const testsUtils = require('../tools/testsUtils');
const testsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');
/* eslint-enable no-unused-vars */

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';
const route = '/activity';

describe(`Tests GET ${route} API OK`, function() {
    before((done) => {
      debugSetup('==> remove all activities in db');
      testsDbUtils.deleteAllActivities({})
        .then((removeAllActivitiesResp) => {
          debugSetup('All activities in db are removed : ', removeAllActivitiesResp);
          debugSetup('==> done!');



          testsDbUtils.createActivity({name :  'Cooking for test'})
            .then((createActivityResp) => {
              debugSetup('One activity created : ', createActivityResp);
              debugSetup('==> done!');

              done();
            })
            .catch((createActivityError) => {
              debugSetup('Error creating activity in db : ', createActivityError);
              debugSetup('==> failed!');
              done(createActivityError);
            });

        })
        .catch((removeAllActivitiesError) => {
          debugSetup('Error removing activities in db : ', removeAllActivitiesError);
          debugSetup('==> failed!');
          done(removeAllActivitiesError);
        });
    });

    it(`Get activities OK with one activity in DB`, function(done) {
      try {
        const path = globalVersion + '/activity/';
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
