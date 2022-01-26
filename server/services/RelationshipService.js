/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a new relationship
*
* createRelationshipRequest CreateRelationshipRequest Create relationship input
* returns GetRelationshipResponse
* */
const createRelationship = ({ createRelationshipRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        createRelationshipRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createRelationship,
};
