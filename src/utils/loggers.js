import {createLogger, format, transports} from 'winston'
import config from '../config/db.js'

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "blue",
    info: "green",
  },
};

const logger = createLogger();
const file = new transports.File({
  level: "warn",
  filename: "./errors.log",
  format: format.combine(
    format.label({ label: "Este es un label de error" }),
    format.timestamp(),
    format.prettyPrint(),
  ),
});

const dev = new transports.Console({
  level: "http",
  format: format.combine(format.colorize(), format.simple()),
});
const prod = new transports.Console({
  level: "warn",
  format: format.combine(format.colorize(), format.simple()),
});

logger.add(file);
if (config.NODE_ENV === "development") {
  logger.add(dev);
} else {
  logger.add(prod);
}

export default logger;