'use strict';

const CheckoutService = require('app/Service/CheckoutService');
const Cart = require('app/Domain/Representation/Cart');

class CheckoutServiceFactory {
  /**
   * Make (Checkout Action FActory)
   * @params {array} Pricing Rules
   * @returns {object} CheckoutService - CheckoutService instance
   */
  static make(pricingRules) {
    return new CheckoutService(
      pricingRules,
      new Cart()
    );
  }
}

module.exports = CheckoutServiceFactory;
