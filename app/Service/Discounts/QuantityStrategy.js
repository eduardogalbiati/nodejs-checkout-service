'use strict';

const AbstractDiscountStrategy = require('./AbstractDiscountStrategy');
const filter = require('lodash/filter');

class QuantityStrategy extends AbstractDiscountStrategy {
  /**
   * Apply quantity discount on products
   * @param {object} cart - The cart object.
   * @param {array} discount - The discount object
   */
  apply(cart, discount) {
    const filteredProducts = filter(cart.products, ['id', discount.productId]);
    if (filteredProducts.length >= discount.data.min) {
      filteredProducts.forEach((item) => {
        item.discount = item.value - discount.data.value;
        item.total = item.value - item.discount;
      }, this);
    }
  }
}

module.exports = QuantityStrategy;
