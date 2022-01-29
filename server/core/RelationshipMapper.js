'use strict';

class RelationshipMapper {
  static getResponseBodyForGetRelationship(relationship) {
    const returnedResponseBody = {
      relationshipId: relationship.id,
      type: relationship.type,
      userId: relationship.userId,
      activityId: relationship.activityId
    };
    return returnedResponseBody;
  }
}

module.exports = RelationshipMapper;
