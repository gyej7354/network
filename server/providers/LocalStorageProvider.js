const logger = require('../logger');

const UserDAO = require('./dao/UserDAO');
const ActivityDAO = require('./dao/ActivityDAO');
const RelationshipDAO = require('./dao/RelationshipDAO');

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
   * @param {Object} user
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

  /**
   *
   * @param {Object} matchingConditions
   * @return {Promise<[string]>}
   */
  static async getUsers() {
    try {
      return await UserDAO.findAll();
    } catch (error) {
      logger.error('[LocalStorageProvider::getUsers] failed to get users - '+ JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {String} activityId
   * @return {Promise<object>}
   */
  static async getActivity(activityId) {
    try {
      const getActivity = await ActivityDAO.findOne(activityId);
      return getActivity;
    } catch (error) {
      logger.error('[LocalStorageProvider::getActivity] failed to get activity - ' + JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {Object} activity
   * @return {Promise<object>}
   */
  static async createActivity(activity) {
    try {
      const createdActivity = await ActivityDAO.create(activity);
      return createdActivity;
    } catch (error) {
      logger.error('[LocalStorageProvider::createActivity] failed to create activity - ' + JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {Object} matchingConditions
   * @return {Promise<[string]>}
   */
  static async getActivities() {
    try {
      return await ActivityDAO.findAll();
    } catch (error) {
      logger.error('[LocalStorageProvider::getActivitiess] failed to get activities - '+ JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {Object} relationship
   * @return {Promise<object>}
   */
  static async createRelationship(relationship) {
    try {

      const createdRelationship = await RelationshipDAO.create(relationship);

      return createdRelationship;
    } catch (error) {
      logger.error('[LocalStorageProvider::createRelationship] failed to create relationship - ' + JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {String} userId
   * @return {Promise<object>}
   */
  static async getUserActivities(userId) {
    try {
      const getUserActivities = await UserDAO.getActivities(userId);
      return getUserActivities;
    } catch (error) {
      logger.error('[LocalStorageProvider::getUserActivities] failed to get user activities - ' + JSON.stringify(error));
      throw error;
    }
  }

  /**
   *
   * @param {String} activityId
   * @return {Promise<object>}
   */
  static async getActivityUsers(activityId) {
    try {
      const getActivityUsers = await ActivityDAO.getUsers(activityId);
      return getActivityUsers;
    } catch (error) {
      logger.error('[LocalStorageProvider::getActivityUsers] failed to get users with a relationship to this activity - ' + JSON.stringify(error));
      throw error;
    }
  }
}

module.exports = LocalStorageProvider;
