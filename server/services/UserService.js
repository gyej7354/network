/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a new user
*
* createUserRequest CreateUserRequest Create user input
* returns GetUserResponse
* */
const createUser = ({ createUserRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        createUserRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
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
      resolve(Service.successResponse({
        userId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createUser,
  getUser,
};
