import logger from '../utils/loggers.js'

export default function loggerMiddelware(req, res, next) {
  logger.info('${new Date().toDateString()} Method: ${req.method} URL: ${req.url}');
    next();
  }

  