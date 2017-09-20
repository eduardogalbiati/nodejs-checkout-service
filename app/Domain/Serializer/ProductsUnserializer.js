'use strict';

const Product = require('app/Domain/Representation/Product');
const flatMap = require('lodash/flatMap');
const times = require('lodash/times');

class ProductsUnserializer {
  /**
   * Get customer pricing rules
   * @param {array} customerId - Customer ID.
   * @returns {array} - Array of Products objects
   */
  static unserialize(data) {
    if (data.products === undefined) {
      throw (new Error('Payload should have products index'));
    }
    const products = flatMap(data.products, (product) => {
      return times(product.quantity, () => {
        return new Product(product.id);
      });
    });
    return products;
  }
}

module.exports = ProductsUnserializer;
