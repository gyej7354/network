'use strict';

class ActivityMapper {

  static getResponseBodyForGetActivity(activity) {
    let returnedResponseBody =  {
      activityId: activity.id,
      name: activity.name,
    };

    return returnedResponseBody;
  }

}

module.exports = ActivityMapper;
