'use strict';

const Discounts = require('app/Service/Discounts/index');
const AbstractDiscountStrategy = require('app/Service/Discounts/AbstractDiscountStrategy');

/**
 * DiscountStrategyFactory.
 * Creates Discount objects based on strategy
 */
class DiscountStrategyFactory {
  /**
   * Returns an strategy based on type.
   * @param {string} type - The discount type.
   * @returns {object} - The strategy based on type.
   */
  static getStrategy(_type) {
    try {
      const type = _type.charAt(0).toUpperCase() + _type.slice(1);
      if (Discounts[`${type}Strategy`].prototype instanceof AbstractDiscountStrategy === false) {
        throw (new Error(`Any strategy should extend an AbstractDiscountStrategy`));
      }
      return new Discounts[`${type}Strategy`]();
    } catch (err) {
      throw (new Error(`Strategy (${_type}) not found (${err.message})`));
    }
  }
}

module.exports = DiscountStrategyFactory;
