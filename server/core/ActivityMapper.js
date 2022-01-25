'use strict';

class ActivityMapper {

  static getResponseBodyForGetActivity(activity) {
    let returnedResponseBody =  {
      activityId: activity.id,
      name: activity.name,
    };

    return returnedResponseBody;
  }

  static getResponseBodyForGetActivities(activities) {
    const returnedResponseBody = [];
    if ((activities !== undefined) && (Array.isArray(activities))) {
      activities.forEach((activity) => {
        returnedResponseBody.push(ActivityMapper.getResponseBodyForGetActivity(activity));
      });
    }
    return returnedResponseBody;
  }
}

module.exports = ActivityMapper;
