const config = require('./config');
const httpContext = require('express-http-context');

const { transports, createLogger, format, addColors } = require('winston');

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

const logFormat = format.printf((info) => {
  const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
  const requestId = httpContext.get('requestId');
  const formattedRequestId = requestId ? requestId : '-';
  return `${formattedDate}|${config.LOG_APP_NAME}|${formattedRequestId}|${info.level}|${info.message}`;
});

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    logFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
