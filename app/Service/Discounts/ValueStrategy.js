'use strict';

const AbstractDiscountStrategy = require('./AbstractDiscountStrategy');
const filter = require('lodash/filter');

class ValueStrategy extends AbstractDiscountStrategy {
  /**
   * Apply value discount on products
   * @param {object} cart - The cart object.
   * @param {array} discount - The discount object
   */
  apply(cart, discount) {
    filter(cart.products, ['id', discount.productId]).forEach((item) => {
      item.discount = item.value - discount.data.value;
      item.total = item.value - item.discount;
    }, this);
  }
}

module.exports = ValueStrategy;
