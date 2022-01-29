const neo4j = require('neo4j-driver');
const config = require('../../config');
const logger = require('../../logger');

class Neo4JSession {
  constructor() {
    if (!Neo4JSession.instance) {
      logger.info('Opening Database Connection');
      Neo4JSession.driver = neo4j.driver(config.NEO4J_DB_URL, neo4j.auth.basic(config.NEO4J_USERNAME, config.NEO4J_PASSWORD));
      Neo4JSession.instance = Neo4JSession.driver.session();
    }
  }

  getInstance() {
    return Neo4JSession.instance;
  }

  closeConnection() {
    logger.info('Closing Database Connection');

    Neo4JSession.instance.close();
    Neo4JSession.driver.close();
  }
}

module.exports = Neo4JSession;
