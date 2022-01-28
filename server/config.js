const path = require('path');

const config = {
  ROOT_DIR: __dirname,
  URL_PORT: 8080,
  URL_PATH: 'http://localhost',
  BASE_VERSION: '/api/v1',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
  PROJECT_DIR: __dirname,
};
config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH = path.join(config.PROJECT_DIR, 'uploaded_files');

// Neo4J configuration
config.NEO4J_USERNAME = 'neo4j'
config.NEO4J_PASSWORD = 'mikado'
config.NEO4J_DB_URL = 'bolt://localhost:7687'

// Logger configuration
config.LOG_LEVEL=process.env.NETWORK_LOG_LEVEL || 'debug';
config.LOG_APP_NAME=process.env.NETWORK_LOG_APP_NAME || 'Social-Network';

config.RELATIONSHIP_LIKES='LIKES';
config.RELATIONSHIP_HATES='HATES';

module.exports = config;
