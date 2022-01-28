const debug = require('debug')('spec:testsDbUtils');
const debugSetup = require('debug')('spec:setup');

const UserDAO = require('../../providers/dao/UserDAO');
const ActivityDAO = require('../../providers/dao/ActivityDAO');
const RelationshipDAO = require('../../providers/dao/RelationshipDAO');

const config = require('../../config');

const testUsers = [{name: 'User 1'}, {name: 'User 2'}, {name: 'User 3'}];
const testActivities = [{name: 'Activity 1'}, {name: 'Activity 2'}, {name: 'Activity 3'}];
const testRelationshipsWithNames = [
  {
    type: config.RELATIONSHIP_LIKES,
    activityName: 'Activity 3',
    userName: 'User 2'
  }, {
    type: config.RELATIONSHIP_LIKES,
    activityName: 'Activity 2',
    userName: 'User 2'
  }];

const usableTestUsers = [{name: 'Posted Test User 1'}];
const usableTestActivities = [{name: 'Posted Test Activity 1'}];

class TestsDbUtils {

  static pushPostedTestUserToDelete(user) {
    TestsDbUtils.postedTestUsers.push(user);
  }

  static pushPostedTestRelationshipToDelete(relationship) {
    TestsDbUtils.postedTestRelationship.push(relationship);

  }

  static pushPostedTestActivityToDelete(activity) {
    TestsDbUtils.postedTestActivities.push(activity);

  }


  static beforeTestCommonSetUp(done) {
    TestsDbUtils.usableTestUsers = usableTestUsers;
    TestsDbUtils.usableTestActivities = usableTestActivities;

    TestsDbUtils.postedTestUsers = [];
    TestsDbUtils.postedTestActivities = [];
    TestsDbUtils.postedTestRelationship = [];

    debugSetup('==> Create test users and activities in db');
    TestsDbUtils.createTestUsersAndActivities(testUsers, testActivities)
      .then((createTestUsersAndActivitiesResp) => {
        TestsDbUtils.createTestUsersAndActivitiesResp = createTestUsersAndActivitiesResp;
        //debugSetup('User and activity Created : ', createTestUsersAndActivitiesResp);
        debugSetup(JSON.stringify(TestsDbUtils.createTestUsersAndActivitiesResp));
        debugSetup('==> done!');
        debugSetup('==> Create test relationships in db');
        const testRelationships = testRelationshipsWithNames.map(relationshipWithName => {
          return {
            type: relationshipWithName.type,
            userId: createTestUsersAndActivitiesResp.users.filter(user => (user.name === relationshipWithName.userName))[0].id,
            activityId: createTestUsersAndActivitiesResp.activities.filter(activity => (activity.name === relationshipWithName.activityName))[0].id,
          }

        });

        TestsDbUtils.createTestRelationships(testRelationships)
          .then((createTestRelationshipsResp) => {
            TestsDbUtils.createTestRelationshipsResp = createTestRelationshipsResp;
            debugSetup(JSON.stringify(TestsDbUtils.createTestRelationshipsResp));

            debugSetup('==> done!');
            done();
          })
          .catch((createTestRelationshipsError) => {
            debugSetup('Error creating relationships in db : ', createTestRelationshipsError);
            debugSetup('==> failed!');
            done(createTestRelationshipsError);
          });
      })
      .catch((createTestUsersAndActivitiesError) => {
        debugSetup('Error creating users and activity in db : ', createTestUsersAndActivitiesError);
        debugSetup('==> failed!');
        done(createTestUsersAndActivitiesError);
      });
  }

  static afterTestCommonClean(done) {
    debugSetup('==> Delete test users and activities in db');

    TestsDbUtils.deleteTestRelationships(TestsDbUtils.createTestRelationshipsResp.concat(TestsDbUtils.postedTestRelationship))
      .then((deleteTestRelationshipsResp => {
        TestsDbUtils.deleteTestUsersAndActivities(testUsers.concat(TestsDbUtils.postedTestUsers), testActivities.concat(TestsDbUtils.postedTestActivities))
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
      }))
      .catch((deleteTestRelationshipsError) => {
        debugSetup('Error deleting relationship  in db : ', deleteTestRelationshipsError);
        debugSetup('==> failed!');
        done(deleteTestRelationshipsError);
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

  static createTestRelationships(relationships) {
    return new Promise(async (resolve, reject) => {
      let createdRelationships = [];
      for (let relationship of relationships) {
        try {
          const createdRelationship = await RelationshipDAO.create(relationship);
          createdRelationships.push(createdRelationship)
        } catch (error) {
          reject(error)
        }
      }
      resolve(createdRelationships);
    });
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

  static deleteTestRelationships(relationships) {
    return new Promise(async (resolve, reject) => {
      let deletedRelationships = [];
      for (let relationship of relationships) {
        try {
          let deletedRelationship = await RelationshipDAO.delete(relationship);
          deletedRelationships.push(deletedRelationship)
        } catch (error) {
          reject(error)
        }
      }
      resolve(deletedRelationships);
    });
  }


}

module.exports = TestsDbUtils;
