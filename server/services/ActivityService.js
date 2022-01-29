const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const ActivityMapper = require('../core/ActivityMapper');

/**
* Create a new activity
*
* createActivityRequest CreateActivityRequest Create activity
* @return {object} GetActivityResponse
* */
const createActivity = ({createActivityRequest}) => new Promise(
  async (resolve, reject) => {
    try {
      const activityToCreate = {
        name: createActivityRequest.name
      };
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
* @return {object} GetActivityResponse
* */
const getActivity = ({activityId}) => new Promise(
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
 * @return {object} List
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

/**
 * Get user activities
 *
 * @return {object} List
 * */
const getActivityUsers = ({activityId}) => new Promise(
  async (resolve, reject) => {
    try {
      const getActivityUsersResp = await LocalStorageProvider.getUserActivities(activityId);
      const returnedResponse = ActivityMapper.getResponseBodyForGetActivityUsers(activityId, getActivityUsersResp);
      resolve(Service.successResponse(returnedResponse, 200));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
module.exports = {
  createActivity,
  getActivity,
  getActivities,
  getActivityUsers
};
