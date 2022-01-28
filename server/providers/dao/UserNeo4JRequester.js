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

  static deleteUser(conditions, next) {
    const filter = `${(conditions.id)? "id:$id," : ""} ${(conditions.name)? "name:$name" : ""} `;

    neo4JSessionInstance.run(`MATCH (users:User {${filter}} ) DELETE users`, conditions)
      .then(result => {
          next(null, conditions)
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

  static findAll(conditions, next) {
    const filter = `${(conditions.id)? "id : $id," : ""} ${(conditions.name)? "name : $name," : ""} `;

    neo4JSessionInstance.run(`MATCH (users:User {${filter}} ) RETURN users`, conditions)
      .then(result => {
        let getUsers = [];
        result.records.forEach(singleRecord => {
          const node = singleRecord.get(0)
          const getUser = {
            id: node.properties.id,
            name: node.properties.name
          }
          getUsers.push(getUser)
        })

        next(null, getUsers)
        })
      .catch(err => {
        console.log('1')

        next(err);
      });
  }

  static deleteAllUsers(next) {
    neo4JSessionInstance.run('MATCH (users:User {}) DELETE users', {})
      .then(result => {
        let deletedUsers = [];
        result.records.forEach(singleRecord => {
          const node = singleRecord.get(0)
          const deletedUser = {
            id: node.properties.id,
            name: node.properties.name
          }
          deletedUsers.push(deletedUser)
        })
        next(null, deletedUsers)
      })
      .catch(err => {
        next(err);
      })
  }

  static getActivities(id, next) {
    const request = `MATCH (u:User {id:'${id}'})-[r]->(a:Activity) RETURN r, a`;

    neo4JSessionInstance.run(request)
      .then(result => {
        let getActivitiesResponse = [];
        result.records.forEach(singleRecord => {
          let relationship = singleRecord.get(0);
          let node = singleRecord.get(1);

          getActivitiesResponse.push({
            activity: {
              id: node.properties.id,
              name: node.properties.name
            },
            relationship: {
              id: relationship.properties.id,
              type: relationship.type,
            }
          })
        })

          next(null, getActivitiesResponse)
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = UserNeo4JRequester;
