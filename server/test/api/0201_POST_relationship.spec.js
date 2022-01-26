const testsUtils = require('../tools/testsUtils');
const TestsDbUtils = require('../tools/testsDbUtils');
const debug = require('debug')('spec:it');
const debugSetup = require('debug')('spec:setup');

const chai = require('chai');
const expect = require('chai').expect;

const globalVersion = '/api/v1';

describe(`Tests POST /relationship/ API`, function() {


    before(TestsDbUtils.beforeTestCommonSetUp);

    after(TestsDbUtils.afterTestCommonClean);

  it.skip('Post relationship OK', function(done) {
    try {
      // TODO
      console.log(TestsDbUtils.createTestUsersAndActivitiesResp)
      done();

    } catch (exception) {

      done();
    }
  });

  it.skip('Post user 2OK', function(done) {
    try {
      // TODO

      done();

    } catch (exception) {

      done();
    }
  });



});
