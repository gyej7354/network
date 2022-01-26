'use strict';
const uuid = require('node-uuid');
const Neo4JSession = require('./Neo4jSession')
var neo4JSessionInstance = new Neo4JSession().getInstance();

class RelationshipNeo4JRequester {
  static defineUserId() {
    return uuid.v4();
  }

  static create(object, next) {
    const request = `MATCH (user:User), (activity:Activity)
WHERE user.id=${object.userId} AND activity.id=${object.activityId}
CREATE (user)-[relationship:LIKES {id: ${object.relationshipId}}]->(activity)
RETURN type(relationship), relationship.id`;

    neo4JSessionInstance.run(request,object)
      .then(results => {
        // [
        //   {
        //     "keys": [
        //       "type(relationship)",
        //       "relationship.id"
        //     ],
        //     "length": 2,
        //     "_fields": [
        //       "LIKES",
        //       "fgg"
        //     ],
        //     "_fieldLookup": {
        //       "type(relationship)": 0,
        //       "relationship.id": 1
        //     }
        //   }
        // ]
        console.log(result.records[0])
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)
        const createdRelationship = {
          id: node.properties.id,
          name: node.properties.name
        }
        next(null, createdRelationship)
      })
      .catch(err => {
        next(err);
      })
  }

}

module.exports = UserNeo4JRequester;
