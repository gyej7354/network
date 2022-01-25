'use strict';

class UserMapper {

  static getResponseBodyForGetUser(user) {
    let returnedResponseBody =  {
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

}

module.exports = UserMapper;
