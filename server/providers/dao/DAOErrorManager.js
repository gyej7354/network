'use strict';

const logger = require('../../logger');

const errorUtils = require('../../utils/errorUtils');

class DAOErrorManager {
  static handleErrorOrNullObject(err, object) {
    return new Promise((resolve, reject) => {
      DAOErrorManager.handleError(err, object)
        .then((objectReturned) => {
          if (!objectReturned) {
            logger.error('[DAO] [handleErrorOrNullObject] returned object is null');
            reject(errorUtils.ERROR_DAO_NOT_FOUND);
          } else {
            resolve(objectReturned);
          }
        })
        .catch((errorReturned) => {
          reject(errorReturned);
        });
    });
  }

  static handleError(err, object) {
    return new Promise((resolve, reject) => {
      if (err) {
        if (err.name === 'AlreadyExist' && err.code === 422) {
          reject(errorUtils.ERROR_DAO_CONFLICT);
        } else if  (err.name === 'NotFound' && err.code === 404) {
          reject(errorUtils.ERROR_DAO_NOT_FOUND);
        } else {
          reject(errorUtils.ERROR_DAO_REQUEST_FAILED);
        }
      } else {
        resolve(object);
      }
    });
  }
}

module.exports = DAOErrorManager;
