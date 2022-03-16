import { LOG_LEVEL } from '../constants.js';

// Log levels in increasing severity
const LEVELS = ['silly', 'debug', 'info', 'warning', 'error', 'fatal', 'none'];

/**
 * Create a logger object
 * @param {string} minLevel The minimum log level that will produce output//
 * @returns
 */
function logger(minLevel) {
  // The function that does the actual logging.
  const log = (level, label, ...args) => {
    if (LEVELS.indexOf(level) >= LEVELS.indexOf(minLevel)) {
      console.log(`${level}: ${label} =>`, ...args);
    }
  };

  // Return an object with convenience functions for logging at specific
  // log levels.
  return {
    log,
    silly(label, ...args) {
      log('silly', label, ...args);
    },
    debug(label, ...args) {
      log('debug', label, ...args);
    },
    info(label, ...args) {
      log('info', label, ...args);
    },
    warning(label, ...args) {
      log('warning', label, ...args);
    },
    error(label, ...args) {
      log('error', label, ...args);
    },
    fatal(label, ...args) {
      log('fatal', label, ...args);
    },
  };
}

export default logger(LOG_LEVEL);
