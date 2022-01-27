/* eslint-disable no-unused-vars */
const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const RelationshipMapper = require('../core/RelationshipMapper');

/**
* Create a new relationship
*
* createRelationshipRequest CreateRelationshipRequest Create relationship input
* returns GetRelationshipResponse
* */
const createRelationship = ({ createRelationshipRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const relationshipToCreate = {
        ...createRelationshipRequest
      }
      const createRelationshipResp = await LocalStorageProvider.createRelationship(relationshipToCreate);
      const returnedResponse = RelationshipMapper.getResponseBodyForGetRelationship(createRelationshipResp);

      resolve(Service.successResponse(returnedResponse, 201));

    } catch (e) {
      reject(Service.rejectResponse(e));

    }
  },
);

module.exports = {
  createRelationship,
};
