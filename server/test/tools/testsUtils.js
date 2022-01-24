const debug = require('debug')('spec:testsUtils');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const testEnv = require('../env.json');

let app = undefined;

const nock = require('nock');


beforeEach(() => {
  console.log('  --  --  --  --  --  --  --  --  --  ');
  nock.cleanAll();
});

class TestsUtils {
  static startServer() {
    return new Promise((resolve, reject) => {
      if (app === undefined) {
        debug('app never started. Start the app.');

        app = require('../../index');

        debug('Wait server starting');
        setTimeout(() => {
          debug('Server started');
          resolve(app);
        }, 4000);
      } else {
        debug('app already started. Return the app.');
        resolve(app);
      }
    });
  }

  static getServer() {
    return app;
  }

}

module.exports = TestsUtils;
