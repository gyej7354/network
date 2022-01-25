'use strict';
const uuid = require('node-uuid');
const Neo4JSession = require('./Neo4jSession')
var neo4JSessionInstance = new Neo4JSession().getInstance();

class UserNeo4JRequester {
  static defineUserId() {
    return uuid.v4();
  }

  static create(object, next) {
    neo4JSessionInstance.run('MATCH (user:User {name: $name}) RETURN user',
      {
        name: object.name,
      })
      .then(results => {
        if (results.records.length != 0) {
          return next({code: 422, name: 'AlreadyExist'}, null);
        } else {
          neo4JSessionInstance.run('CREATE (user:User {id: $id, name: $name}) RETURN user',
            {
              id: object.id,
              name: object.name,
            })
            .then(result => {
              const singleRecord = result.records[0]
              const node = singleRecord.get(0)
              const createdUser = {
                id: node.properties.id,
                name: node.properties.name
              }
              next(null, createdUser)
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

  static deleteUser(object, next) {
    neo4JSessionInstance.run('MATCH (user:User {name: $name}) DELETE user',
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

  static findOne(user, next) {
    neo4JSessionInstance.run('MATCH (user:User {id: $id}) RETURN user', {
      id: user.id
    })
      .then(result => {
        if (result.records.length == 0) {
          return next({code: 404, name: 'NotFound'}, null);
        } else {

          const singleRecord = result.records[0]
          const node = singleRecord.get(0)
          const getUser = {
            id: node.properties.id,
            name: node.properties.name
          }
          next(null, getUser)
        }
      })
      .catch(err => {
        next(err);
      });
  }

}

module.exports = UserNeo4JRequester;
