'use strict';
const uuid = require('node-uuid');
const Neo4JSession = require('./Neo4jSession')
var neo4JSessionInstance = new Neo4JSession().getInstance();

class ActivityNeo4JRequester {
  static defineActivityId() {
    return uuid.v4();
  }

  static create(object, next) {
    neo4JSessionInstance.run('MATCH (activity:Activity {name: $name}) RETURN activity',
      {
        name: object.name,
      })
      .then(results => {
        if (results.records.length != 0) {
          return next({code: 422, name: 'AlreadyExist'}, null);
        } else {
          neo4JSessionInstance.run('CREATE (activity:Activity {id: $id, name: $name}) RETURN activity',
            {
              id: object.id,
              name: object.name,
            })
            .then(result => {
              const singleRecord = result.records[0]
              const node = singleRecord.get(0)
              const createdActivity = {
                id: node.properties.id,
                name: node.properties.name
              }
              next(null, createdActivity)
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

  static deleteActivity(object, next) {
    neo4JSessionInstance.run('MATCH (activity:Activity {name: $name}) DELETE activity',
      {
        name: object.name,
      })
      .then(result => {

        next(null, object)
      })
      .catch(err => {
        next(err);
      })
  }

  static findOne(activity, next) {
    neo4JSessionInstance.run('MATCH (activity:Activity {id: $id}) RETURN activity', {
      id: activity.id
    })
      .then(result => {
        if (result.records.length == 0) {
          return next({code: 404, name: 'NotFound'}, null);
        } else {

          const singleRecord = result.records[0]
          const node = singleRecord.get(0)
          const getActivity = {
            id: node.properties.id,
            name: node.properties.name
          }
          next(null, getActivity)
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static findAll(conditions, next) {
    const filter = `${(conditions.id)? "id : $id," : ""} ${(conditions.name)? "name : $name," : ""} `;

    neo4JSessionInstance.run(`MATCH (activities:Activity {${filter}}) RETURN activities`, conditions)
      .then(result => {
        let getActivities = [];
        result.records.forEach(singleRecord => {
          const node = singleRecord.get(0)
          const getActivity = {
            id: node.properties.id,
            name: node.properties.name
          }
          getActivities.push(getActivity)
        })

        next(null, getActivities)
      })
      .catch(err => {
        next(err);
      });
  }

  static deleteAllActivities(next) {
    neo4JSessionInstance.run('MATCH (activities:Activity {}) DELETE activities', {})
      .then(result => {
        let deletedActivities = [];
        result.records.forEach(singleRecord => {
          const node = singleRecord.get(0)
          const deletedActivity = {
            id: node.properties.id,
            name: node.properties.name
          }
          deletedActivities.push(deletedActivity)
        })
        next(null, deletedActivities)
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = ActivityNeo4JRequester;
