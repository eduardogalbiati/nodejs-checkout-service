'use strict';

const filter = require('lodash/filter');

class AbstractDiscountStrategy {
  /**
   * Apply should be implemented by child classes
   * @param {object} cart - The cart object.
   * @returns {array} discount - The discount object
   */
  apply(cart, discount) {
    throw (new Error('Method not implemented'));
  }
}

module.exports = AbstractDiscountStrategy;
