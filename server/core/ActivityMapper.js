'use strict';

class ActivityMapper {

  static getResponseBodyForGetActivity(activity) {
    let returnedResponseBody = {
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

  static getResponseBodyForGetActivityUsers(activityId, activityUsers) {
    const returnedResponseBody = [];
    activityUsers.forEach(user => {
      returnedResponseBody.push({
        user: {
          userId: user.user.id,
          name: user.user.name
        },
        relationship: {
          relationshipId: user.relationship.id,
          type: user.relationship.type,
          userId: user.user.id,
          activityId: activityId,
        }
      })
    })
    return returnedResponseBody;
  }
}

module.exports = ActivityMapper;
