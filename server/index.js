const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

let expressServer = undefined;


const launchServer = async () => {
  try {
    expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));

// for tests
module.exports = expressServer.app;