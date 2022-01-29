'use strict';

const logger = require('../../logger');
const errorUtils = require('../../utils/errorUtils');

const DAOErrorManager = require('./DAOErrorManager');
const RelationshipNeo4JRequester = require('./RelationshipNeo4JRequester');

const MISSING_MANDATORY_PARAM_ERROR = errorUtils.ERROR_DAO_MISSING_MANDATORY_PARAM;

class RelationshipDAO {
  static create(object) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (object === undefined) {
        logger.error('[RelationshipDAO::create] [FAILED] : object undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (object.type === undefined) {
        logger.error('[RelationshipDAO::create] [FAILED] : type undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (object.userId === undefined) {
        logger.error('[RelationshipDAO::create] [FAILED] : userId undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (object.activityId === undefined) {
        logger.error('[RelationshipDAO::create] [FAILED] : activityId undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }

      // Define automatic values
      object.id = RelationshipNeo4JRequester.defineRelationshipId();

      // Launch database request
      RelationshipNeo4JRequester.create(object, (err, relationship) => {
        DAOErrorManager.handleErrorOrNullObject(err, relationship)
          .then((objectReturned) => {
            resolve(objectReturned);
          })
          .catch((errorReturned) => {
            logger.error('[RelationshipDAO::create] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            reject(errorReturned);
          });
      });
    });
  }

  static delete(relationship) {
    return new Promise((resolve, reject) => {
      // Verify parameters
      if (relationship === undefined) {
        logger.error('[RelationshipDAO::delete] [FAILED] : relationship undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      if (relationship.id === undefined) {
        logger.error('[RelationshipDAO::delete] [FAILED] : relationship id  undefined');
        reject(MISSING_MANDATORY_PARAM_ERROR);
      }
      const conditions = {};


      conditions.id= relationship.id;
      conditions.type= relationship.type;


      // Launch database request
      RelationshipNeo4JRequester.deleteRelationship(conditions, (err, response) => {
        DAOErrorManager.handleErrorOrNullObject(err, response)
          .then((objectReturned) => {
            resolve(relationship);
          })
          .catch((errorReturned) => {
            logger.error('[RelationshipDAO::delete] [FAILED] errorReturned:' + typeof errorReturned + ' = ' + JSON.stringify(errorReturned));
            reject(errorReturned);
          });
      });
    });
  }
}

module.exports = RelationshipDAO;
