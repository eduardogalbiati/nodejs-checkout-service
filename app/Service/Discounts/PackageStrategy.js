'use strict';

const AbstractDiscountStrategy = require('./AbstractDiscountStrategy');
const filter = require('lodash/filter');

class PackageStrategy extends AbstractDiscountStrategy {
  /**
   * Apply package discount on products
   * @param {object} cart - The cart object.
   * @param {array} discount - The discount object
   */
  apply(cart, discount) {
    const filteredProducts = filter(cart.products, ['id', discount.productId]);
    const packages = Math.floor(filteredProducts.length / discount.data.total);

    if (packages >= 1) {
      let freeAds = packages * (discount.data.total - discount.data.pay);
      filteredProducts.forEach((item) => {
        if (freeAds > 0) {
          item.discount = item.value;
          item.total = item.value - item.discount;
          freeAds -= 1;
        }
      }, this);
    }
  }
}

module.exports = PackageStrategy;
