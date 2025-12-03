/**
 * Logger utility with request tracing support
 * Provides request ID generation and context-aware logging for Google Apps Script
 */

const LoggerContext = {
  currentRequestId: null,
};

/**
 * Generates a unique request ID
 * Format: timestamp-random (e.g., 1701234567890-a3f2b8)
 */
function generateRequestId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Sets the request ID in the global context
 * Should be called at the start of each request
 */
function setRequestId(requestId) {
  LoggerContext.currentRequestId = requestId;
}

/**
 * Gets the current request ID from context
 */
function getRequestId() {
  return LoggerContext.currentRequestId;
}

/**
 * Clears the request ID from context
 * Should be called at the end of request processing
 */
function clearRequestId() {
  LoggerContext.currentRequestId = null;
}

/**
 * Formats a log message with request ID prefix
 */
function formatMessage(message) {
  const requestId = getRequestId();
  if (requestId) {
    return `${requestId} | ${message}`;
  }
  return message;
}

/**
 * Logger wrapper functions
 * Automatically include request ID in all log messages
 */
const Logger = {
  log: function (...args) {
    if (args.length == 0) {
      return;
    }
    console.log(formatMessage(args[0]), ...args.slice(1));
  },

  debug: function (...args) {
    if (args.length == 0) {
      return;
    }
    console.debug(formatMessage(args[0]), ...args.slice(1));
  },

  info: function (...args) {
    if (args.length == 0) {
      return;
    }
    console.info(formatMessage(args[0]), ...args.slice(1));
  },

  warn: function (...args) {
    if (args.length == 0) {
      return;
    }
    console.log(formatMessage(args[0]), ...args.slice(1));
  },

  error: function (...args) {
    if (args.length == 0) {
      return;
    }
    console.log(formatMessage(args[0]), ...args.slice(1));
  },
};
