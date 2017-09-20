'use strict';

const ResponseBuilder = require('app/Response/ResponseBuilder');

class CheckoutResponseBuilder extends ResponseBuilder{
  /**
   * Build a body json from cart
   * @param {object} res - Response
   * @param {object} cart - Cart object
   */
  static successFromCart(res, cart){
    return this.success(res, {
      products: cart.getProducts(),
      total: cart.getTotal()
    });
  }
}

module.exports = CheckoutResponseBuilder;
