'use strict';

const logger = require('../../logger');
const errorUtils = require('../../utils/errorUtils');

const DAOErrorManager = require('./DAOErrorManager');
const ActivityNeo4JRequester = require('./ActivityNeo4JRequester');

const MISSING_MANDATORY_PARAM_ERROR = errorUtils.ERROR_DAO_MISSING_MANDATORY_PARAM;

class ActivityDAO {

  static create(object) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (object === undefined) {
        logger.error('[ActivityDAO::create] [FAILED] : object undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (object.name === undefined) {
        logger.error('[ActivityDAO::create] [FAILED] : object undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }

      // Define automatic values
      object.id = ActivityNeo4JRequester.defineActivityId();
      // Launch database request
      ActivityNeo4JRequester.create(object, (err, activity) => {
        DAOErrorManager.handleErrorOrNullObject(err, activity)
          .then((objectReturned) => {
            resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[ActivityDAO::create] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            reject(errorReturned);
          });
      });
    });
  }

  static findOne(id, matchingConditions = {}) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (id === undefined) {
        logger.error('[ActivityDAO::findOne] [FAILED] : id undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }

      // Launch database request
      ActivityNeo4JRequester.findOne({id: id}, (err, activity) => {
        // Use errorManager to return appropriate dao errors
        DAOErrorManager.handleErrorOrNullObject(err, activity)
          .then((objectReturned) => {
            logger.debug('[ActivityDAO::findOne] [OK] objectReturned:' + typeof objectReturned + ' = ' + JSON.stringify(objectReturned));
            return resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[ActivityDAO::findOne] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            return reject(errorReturned);
          });
      });
    });
  }

  static findAll(matchingConditions = {}) {
    return new Promise((resolve, reject) => {
      const condition = {};

      // Verify parameters
      if (matchingConditions.activityId !== undefined) {
        condition.id = matchingConditions.activityId;
      }
      if (matchingConditions.name !== undefined) {
        condition.name = matchingConditions.name;
      }

      // Launch database request
      ActivityNeo4JRequester.findAll(condition, (err, user) => {
        // Use errorManager to return appropriate dao errors
        DAOErrorManager.handleErrorOrNullObject(err, user)
          .then((objectReturned) => {
            logger.debug('[ActivityDAO::findAll] [OK] objectReturned:' + typeof objectReturned + ' = ' + JSON.stringify(objectReturned));
            return resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[ActivityDAO::findAll] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            return reject(errorReturned);
          });
      });
    });
  }
}

module.exports = ActivityDAO;
