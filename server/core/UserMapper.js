'use strict';

class UserMapper {

  static getResponseBodyForGetUser(user) {
    let returnedResponseBody = {};

    returnedResponseBody = {
      userId: user.id,
      name: user.name,
    };

    return returnedResponseBody;
  }

}

module.exports = UserMapper;
