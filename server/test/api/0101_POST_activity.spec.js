/* eslint-disable no-unused-vars */
const testsUtils = require('../tools/testsUtils');
const testsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');
/* eslint-enable no-unused-vars */

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';

describe(`Tests POST /activity/ API`, function() {

    before((done) => {
      debugSetup('==> remove test activity in db');
      testsDbUtils.deleteActivity({name : 'Cooking for test'})
        .then((deleteActivityResp) => {
          debugSetup('ActivityDeleted : ', deleteActivityResp);
          debugSetup('==> done!');
          done();
        })
        .catch((deleteActivityError) => {
          debugSetup('Error removing activity in db : ', deleteActivityError);
          debugSetup('==> failed!');
          done(deleteActivityError);
        });
    });

    it('Post activity OK', function(done) {
      try {
        const path = globalVersion + "/activity/" ;
        const sentBody = {
          name : 'Cooking for test'
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
            expect(Object.keys(response.body)).have.members(['name', 'activityId']);
            expect(response.body).to.have.property('name', sentBody.name);
            expect(response.body).to.have.property('activityId')
            expect(response.body.activityId).to.be.an('string')

            done();
          });
      } catch (exception) {
        debug('exception: %s', exception.stack);
        expect.fail('it test throws an exception');
        done();
      }
    });

    it('Post existing activity should return 422', function(done) {
      try {
        const path = globalVersion + "/activity/" ;
        const sentBody = {
          name : 'Cooking for test'
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
