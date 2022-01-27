'use strict';
const uuid = require('node-uuid');
const Neo4JSession = require('./Neo4jSession')
var neo4JSessionInstance = new Neo4JSession().getInstance();

class RelationshipNeo4JRequester {

  static defineRelationshipId() {
    return uuid.v4();
  }

  static create(object, next) {
    const matchRequest = `MATCH (n:User {id:'${object.userId}'})-[r:${object.type}]->(a:Activity {id:'${object.activityId}'})
RETURN r`;

    const request = `MATCH (user:User), (activity:Activity)
WHERE user.id='${object.userId}' AND activity.id='${object.activityId}'
CREATE (user)-[relationship:${object.type} {id: '${object.id}'}]->(activity)
RETURN type(relationship), relationship.id`;

    neo4JSessionInstance.run(matchRequest, {})
      .then(results => {
        if (results.records.length != 0) {
          return next({code: 422, name: 'AlreadyExist'}, null);
        } else {

          neo4JSessionInstance.run(request, object)
            .then(results => {

              const singleRecord = results.records[0]
              const createdRelationship = {
                id: singleRecord.get(1),
                type: singleRecord.get(0),
                userId: object.userId,
                activityId: object.activityId
              }


              next(null, createdRelationship)
            })
            .catch(err => {
              next(err);
            })
        }
      })
      .catch(err => {
        next(err);
      })
  }


  static deleteRelationship(conditions, next) {
    const filter = `${(conditions.id) ? "id:$id" : ""}`;
    neo4JSessionInstance.run(`MATCH (n)-[r:${conditions.type} {${filter}} ]->() DELETE r`, conditions)
      .then(result => {
        next(null, conditions)
      })
      .catch(err => {
        next(err);
      })
  }

}

module.exports = RelationshipNeo4JRequester;
