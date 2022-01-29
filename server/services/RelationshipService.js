/* eslint-disable no-unused-vars */
const Service = require('./Service');
const LocalStorageProvider = require('../providers/LocalStorageProvider');
const RelationshipMapper = require('../core/RelationshipMapper');

/**
 * Create a new relationship
 *
 * createRelationshipRequest CreateRelationshipRequest Create relationship input
 * @return {object} GetRelationshipResponse
 * */
const createRelationship = ({createRelationshipRequest}) => new Promise(
  async (resolve, reject) => {
    try {
      const relationshipToCreate = {
        ...createRelationshipRequest
      };
      const createRelationshipResp = await LocalStorageProvider.createRelationship(relationshipToCreate);
      const returnedResponse = RelationshipMapper.getResponseBodyForGetRelationship(createRelationshipResp);

      resolve(Service.successResponse(returnedResponse, 201));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

/**
 * Deletes a new relationship
 *
 * relationshipId  id of relationship to delete
 * @return {object}  empty object
 * */
const deleteRelationship = ({relationshipId}) => new Promise(
  async (resolve, reject) => {
    try {
      const deleteRelationshipResp = await LocalStorageProvider.deleteRelationship(relationshipId);

      resolve(Service.successResponse({}, 204));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);


module.exports = {
  createRelationship,
  deleteRelationship
};
