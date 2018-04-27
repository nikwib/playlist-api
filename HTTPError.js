'use strict';

module.exports = class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

require('util').inherits(module.exports, Error);
