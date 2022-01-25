'use strict';

const logger = require('../../logger');
const errorUtils = require('../../utils/errorUtils');

const DAOErrorManager = require('./DAOErrorManager');
const UserNeo4JRequester = require('./UserNeo4JRequester');

const MISSING_MANDATORY_PARAM_ERROR = errorUtils.ERROR_DAO_MISSING_MANDATORY_PARAM;

class UserDAO {

  static create(object) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (object === undefined) {
        logger.error('[UserDAO::create] [FAILED] : object undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (object.name === undefined) {
        logger.error('[UserDAO::create] [FAILED] : object undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }

      // Define automatic values
      object.id = UserNeo4JRequester.defineUserId();
      // Launch database request
      UserNeo4JRequester.create(object, (err, user) => {
        DAOErrorManager.handleErrorOrNullObject(err, user)
          .then((objectReturned) => {
            resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[UserDAO::create] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            reject(errorReturned);
          });
      });
    });
  }

  static findOne(id, matchingConditions = {}) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (id === undefined) {
        logger.error('[UserDAO::findOne] [FAILED] : id undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }

      // Launch database request
      UserNeo4JRequester.findOne({id: id}, (err, user) => {
        // Use errorManager to return appropriate dao errors
        DAOErrorManager.handleErrorOrNullObject(err, user)
          .then((objectReturned) => {
            logger.debug('[UserDAO::findOne] [OK] objectReturned:' + typeof objectReturned + ' = ' + JSON.stringify(objectReturned));
            return resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[UserDAO::findOne] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            return reject(errorReturned);
          });
      });
    });
  }


  static findAll(matchingConditions = {}) {
    return new Promise((resolve, reject) => {
      const condition = {};

      // Verify parameters
      if (matchingConditions.userId !== undefined) {
        condition.id= matchingConditions.userId;
      }
      if (matchingConditions.name !== undefined) {
        condition.name = matchingConditions.name;
      }

      // Launch database request
      UserNeo4JRequester.findAll(condition, (err, user) => {
        // Use errorManager to return appropriate dao errors
        DAOErrorManager.handleErrorOrNullObject(err, user)
          .then((objectReturned) => {
            logger.debug('[UserDAO::findAll] [OK] objectReturned:' + typeof objectReturned + ' = ' + JSON.stringify(objectReturned));
            return resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[UserDAO::findAll] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            return reject(errorReturned);
          });
      });
    });
  }

}

module.exports = UserDAO;
