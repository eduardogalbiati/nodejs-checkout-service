'use strict';

class ValidatorError {
  constructor(error) {
    this.message = error;
    this.code = 412;
  }
}

module.exports = ValidatorError;