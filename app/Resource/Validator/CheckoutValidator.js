'use strict';

const CheckoutSchema = require('./CheckoutSchema');
const ValidatorError = require('./ValidatorError');

const Ajv = require('ajv');

class CheckoutValidator {
  /**
   * Validate payload with checkout schema
   * @param {array} data - JSON Objects.
   * @returns {boolean} - true if data is valid
   * @throws ValidtionError - if data is invalid
   */
  static validate(data) {
      let ajv = new Ajv();
      let valid = ajv.validate(CheckoutSchema.getSchema(), data);
      if (!valid) {
        throw new ValidatorError(ajv.errors) ;
      }
      return true;
  }
}

module.exports = CheckoutValidator;