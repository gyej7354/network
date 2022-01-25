const debug = require('debug')('spec:testsDbUtils');

const UserNeo4JRequester = require('../../providers/dao/UserNeo4JRequester');
const ActivityNeo4JRequester = require('../../providers/dao/ActivityNeo4JRequester');


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

  static deleteActivity(activity) {
    return new Promise((resolve, reject) => {
      ActivityNeo4JRequester.deleteActivity(activity, (err, activity) => {
        if (err) {
          debug('delete activity failure : ', err);
          resolve([]);
        } else {
          debug('delete activity done with success');
          resolve(activity);
        }
      });
    });
  }

  static createActivity(activity) {
    return new Promise((resolve, reject) => {
      activity.id = ActivityNeo4JRequester.defineActivityId();

      // Launch db request
      ActivityNeo4JRequester.create(activity, (err, createdActivity) => {
        if (err) {
          debug('create activity failure : ', err);
          reject(err);
        } else {
          debug('create activity done with success');
          resolve(createdActivity);
        }
      });
    });
  }
}

module.exports = TestsDbUtils;
