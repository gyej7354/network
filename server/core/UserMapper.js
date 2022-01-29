'use strict';

class UserMapper {
  static getResponseBodyForGetUser(user) {
    const returnedResponseBody = {
      userId: user.id,
      name: user.name,
    };

    return returnedResponseBody;
  }

  static getResponseBodyForGetUsers(users) {
    const returnedResponseBody = [];
    if ((users !== undefined) && (Array.isArray(users))) {
      users.forEach((user) => {
        returnedResponseBody.push(UserMapper.getResponseBodyForGetUser(user));
      });
    }
    return returnedResponseBody;
  }

  static getResponseBodyForGetUserActivities(userId, userActivities) {
    const returnedResponseBody = [];
    userActivities.forEach((activity) => {
      returnedResponseBody.push({
        activity: {
          activityId: activity.activity.id,
          name: activity.activity.name
        },
        relationship: {
          relationshipId: activity.relationship.id,
          type: activity.relationship.type,
          userId: userId,
          activityId: activity.activity.id,
        }
      });
    });


    return returnedResponseBody;
  }
}

module.exports = UserMapper;
