/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a new activity
*
* createActivityRequest CreateActivityRequest Create activity
* returns GetActivityResponse
* */
const createActivity = ({ createActivityRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        createActivityRequest,
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
* Get activity info
*
* activityId String Id of the activity
* returns GetActivityResponse
* */
const getActivity = ({ activityId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        activityId,
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
  createActivity,
  getActivity,
};
