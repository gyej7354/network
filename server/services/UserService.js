/* eslint-disable no-unused-vars */
const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const UserMapper = require('../core/UserMapper');

/**
* Create a new user
*
* createUserRequest CreateUserRequest Create user input
* returns GetUserResponse
* */
const createUser = ({ createUserRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const userToCreate = {
        name: createUserRequest.name
      }
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
* returns GetUserResponse
* */
const getUser = ({ userId }) => new Promise(
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

module.exports = {
  createUser,
  getUser,
};
