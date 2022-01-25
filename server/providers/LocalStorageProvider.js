const logger = require('../logger');

const UserDAO = require('./dao/UserDAO');

class LocalStorageProvider {

  /**
   *
   * @param {String} userId
   * @return {Promise<object>}
   */
  static async getUser(userId) {
    try {
      const getUser = await UserDAO.findOne(userId);
      return getUser;
    } catch (error) {
      logger.error('[LocalStorageProvider::getUser] failed to get user - ' + JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {Object} project
   * @return {Promise<object>}
   */
  static async createUser(user) {
    try {
      const createdUser = await UserDAO.create(user);
      return createdUser;
    } catch (error) {
      logger.error('[LocalStorageProvider::createUser] failed to create user - ' + JSON.stringify(error));
      throw error;
    }
  }

}

module.exports = LocalStorageProvider;
