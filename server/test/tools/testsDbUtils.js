const debug = require('debug')('spec:testsDbUtils');

const UserNeo4JRequester = require('../../providers/dao/UserNeo4JRequester');


class TestsDbUtils {
  static deleteUser(user) {
    return new Promise((resolve, reject) => {
      UserNeo4JRequester.deleteUser(user, (err, user) => {
        if (err) {
          debug('delete user failure : ', err);
          resolve([]);
        } else {
          debug('delete user done with success');
          resolve(user);
        }
      });
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      user.id = UserNeo4JRequester.defineUserId();

      // Launch db request
      UserNeo4JRequester.create(user, (err, createdUser) => {
        if (err) {
          debug('create user failure : ', err);
          reject(err);
        } else {
          debug('create user done with success');
          resolve(createdUser);
        }
      });
    });
  }

}

module.exports = TestsDbUtils;
