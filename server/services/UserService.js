const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const UserMapper = require('../core/UserMapper');

/**
* Create a new user
*
* @param {object} createUserRequest Create user input
* @return {object} GetUserResponse
* */
const createUser = ({createUserRequest}) => new Promise(
  async (resolve, reject) => {
    try {
      const userToCreate = {
        name: createUserRequest.name
      };
      const createUserResp = await LocalStorageProvider.createUser(userToCreate);
      const returnedResponse = UserMapper.getResponseBodyForGetUser(createUserResp);

      resolve(Service.successResponse(returnedResponse, 201));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
/**
* Get user info
*
* userId String Id of the user
* @return {object} GetUserResponse
* */
const getUser = ({userId}) => new Promise(
  async (resolve, reject) => {
    try {
      const getUserResp = await LocalStorageProvider.getUser(userId);
      const returnedResponse = UserMapper.getResponseBodyForGetUser(getUserResp);

      resolve(Service.successResponse(returnedResponse, 200));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

/**
 * Get user list
 *
 * @return {object} List
 * */
const getUsers = () => new Promise(
  async (resolve, reject) => {
    try {
      const getUsersResp = await LocalStorageProvider.getUsers();
      const returnedResponse = UserMapper.getResponseBodyForGetUsers(getUsersResp);
      resolve(Service.successResponse(returnedResponse, 200));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

/**
 * Get user activities
 *
 * @return {object} List
 * */
const getUserActivities = ({userId}) => new Promise(
  async (resolve, reject) => {
    try {
      // Check if user exist
      await LocalStorageProvider.getUser(userId);


      const getUserActivitiesResp = await LocalStorageProvider.getUserActivities(userId);
      const returnedResponse = UserMapper.getResponseBodyForGetUserActivities(userId, getUserActivitiesResp);
      resolve(Service.successResponse(returnedResponse, 200));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

/**
 * Delete user and relationships
 *
 * userId String Id of the user
 * @return {object} empty object
 * */
const deleteUser = ({userId}) => new Promise(
  async (resolve, reject) => {
    try {
      const getUserActivitiesResp = await LocalStorageProvider.getUserActivities(userId);

      for (const userActivity of getUserActivitiesResp) {
        await LocalStorageProvider.deleteRelationship(userActivity.relationship.id);
      }

      await LocalStorageProvider.deleteUser(userId);
      resolve(Service.successResponse({}, 204));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

module.exports = {
  createUser,
  getUser,
  getUsers,
  getUserActivities,
  deleteUser
};
