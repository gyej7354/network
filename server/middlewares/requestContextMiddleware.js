const httpContext = require('express-http-context');
const ruid = require('express-ruid');

const saveRuidInContextMiddelware = ruid({
  setHeader: true,
  header: 'request-id',
  attribute: 'requestId',
  setInContext: false,
  prefixRoot: process.pid,
  prefixSeparator: '-',
  upBytes: 4,
  idSeparator: '-',
  idMax: 99,
});

const requestContextMiddleware = (req, res, next) => {
  saveRuidInContextMiddelware(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      httpContext.set('requestId', req.requestId);
      next();
    }
  });
};

module.exports = requestContextMiddleware;
