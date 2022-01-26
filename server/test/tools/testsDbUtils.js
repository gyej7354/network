const debug = require('debug')('spec:testsDbUtils');
const debugSetup = require('debug')('spec:setup');

const UserDAO = require('../../providers/dao/UserDAO');
const ActivityDAO = require('../../providers/dao/ActivityDAO');

const testUsers = [{name: 'User 1'}, {name: 'User 2'}, {name: 'User 3'}];
const testActivities = [{name: 'Activity 1'}, {name: 'Activity 2'}, {name: 'Activity 3'}];
const testRelationships = [['User 1', 'Activity 1'], ['User 2', 'Activity 2']];
const postedTestUsers = [{name: 'Posted Test User 1'}];
const postedTestActivities = [{name: 'Posted Test Activity 1'}];

class TestsDbUtils {


  static beforeTestCommonSetUp(done) {

    TestsDbUtils.postedTestUsers = postedTestUsers;
    TestsDbUtils.postedTestActivities = postedTestActivities;

    debugSetup('==> Create test users and activities in db');
    TestsDbUtils.createTestUsersAndActivities(testUsers, testActivities)
      .then((createTestUsersAndActivitiesResp) => {
        TestsDbUtils.createTestUsersAndActivitiesResp = createTestUsersAndActivitiesResp;
        //debugSetup('User and activity Created : ', createTestUsersAndActivitiesResp);
        debugSetup('==> done!');
        done();
      })
      .catch((createTestUsersAndActivitiesError) => {
        debugSetup('Error creating users and activity in db : ', createTestUsersAndActivitiesError);
        debugSetup('==> failed!');
        done(createTestUsersAndActivitiesError);
      });
  }

  static afterTestCommonClean(done) {
    debugSetup('==> Delete test users and activities in db');
    TestsDbUtils.deleteTestUsersAndActivities(testUsers.concat(TestsDbUtils.postedTestUsers), testActivities.concat(postedTestActivities))
      .then((deleteTestUsersAndActivitiesResponse) => {
        //debugSetup('User and activity Deleted : ', deleteTestUsersAndActivitiesResponse);
        debugSetup('==> done!');
        done();
      })
      .catch((deleteTestUsersAndActivitiesError) => {
        debugSetup('Error deleting users and activity  in db : ', deleteTestUsersAndActivitiesError);
        debugSetup('==> failed!');
        done(deleteTestUsersAndActivitiesError);
      });
  }

  static createTestUsers(users) {
    return new Promise(async (resolve, reject) => {
      let createdUsers = [];
      for (let user of users) {
        try {
          const createdUser = await UserDAO.create(user);
          createdUsers.push(createdUser)
        } catch (error) {
          reject(error)
        }
      }
      resolve(createdUsers);
    });
  }

  static createTestActivities(activities) {
    return new Promise(async (resolve, reject) => {
      let createdActivities = [];

      for (let activity of activities) {
        try {
          const createdActivity = await ActivityDAO.create(activity);
          createdActivities.push(createdActivity)
        } catch (error) {
          reject(error)
        }
      }
      resolve(createdActivities);
    });
  }

  static createTestUsersAndActivities(users, activities) {
    return new Promise(async (resolve, reject) => {
      try {
        const createdActivities = await TestsDbUtils.createTestActivities(activities);
        const createdUsers = await TestsDbUtils.createTestUsers(users);
        resolve({users: createdUsers, activities: createdActivities})

      } catch (error) {
        reject(error)
      }

    })
  }

  static deleteTestUsers(users) {
    return new Promise(async (resolve, reject) => {
      let deletedUsers = [];
      for (let user of users) {
        try {
          let deletedUser = await UserDAO.delete(user);
          deletedUsers.push(deletedUser)
        } catch (error) {
          reject(error)
        }
      }
      resolve(deletedUsers);
    });
  }

  static deleteTestActivities(activities) {
    return new Promise(async (resolve, reject) => {
      let deletedActivities = [];
      for (let activity of activities) {
        try {
          let deletedActivity = await ActivityDAO.delete(activity);
          deletedActivities.push(deletedActivity)
        } catch (error) {
          reject(error)
        }
      }
      resolve(deletedActivities);
    });
  }

  static deleteTestUsersAndActivities(users, activities) {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedActivities = await TestsDbUtils.deleteTestActivities(activities);
        const deletedUsers = await TestsDbUtils.deleteTestUsers(users);
        resolve([deletedUsers, deletedActivities])

      } catch (error) {
        reject(error)
      }

    })
  }

}

module.exports = TestsDbUtils;
