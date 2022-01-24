const testsUtils = require('../tools/testsUtils');
const debug = require('debug')('spec:startServer');

const nock = require('nock');

before((done) => {
  nock.cleanAll();
  testsUtils.startServer()
    .then((startedServer) => {
      done();
    })
    .catch((beforeError) => {
      done(beforeError);
    });
});
