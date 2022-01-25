/* eslint-disable no-unused-vars */
const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const ActivityMapper = require('../core/ActivityMapper');

/**
* Create a new activity
*
* createActivityRequest CreateActivityRequest Create activity
* returns GetActivityResponse
* */
const createActivity = ({ createActivityRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const activityToCreate = {
        name: createActivityRequest.name
      }
      const createActivityResp = await LocalStorageProvider.createActivity(activityToCreate);
      const returnedResponse = ActivityMapper.getResponseBodyForGetActivity(createActivityResp);

      resolve(Service.successResponse(returnedResponse, 201));

    } catch (e) {
      reject(Service.rejectResponse(e));
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
      const getActivityResp = await LocalStorageProvider.getActivity(activityId);
      const returnedResponse = ActivityMapper.getResponseBodyForGetActivity(getActivityResp);

      resolve(Service.successResponse(returnedResponse, 200));

    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

/**
 * Get activity list
 *
 * returns List
 * */
const getActivities = () => new Promise(
  async (resolve, reject) => {
    try {
      const getActivitiesResp = await LocalStorageProvider.getActivities();
      const returnedResponse = ActivityMapper.getResponseBodyForGetActivities(getActivitiesResp);
      resolve(Service.successResponse(returnedResponse, 200));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

module.exports = {
  createActivity,
  getActivity,
  getActivities
};
