'use strict';

const Cart = require('app/Domain/Representation/Cart');
const DiscountStrategyFactory = require('app/Service/Discounts/Factory/DiscountStrategyFactory');

class CheckoutService {
  constructor(
    pricingRules,
    cart
  ) {
    if(!pricingRules instanceof Array || pricingRules.products === undefined){
      throw (new Error('Pricing rules not provided'))
    }
    this.pricingRules = pricingRules;
    this.cart = cart
  }

  addItem(_item) {
    const item = Object.assign({}, _item);
    item.value = this.getPriceByProductId(item.id);
    item.total = item.value;
    this.cart.addProduct(item);
    this.applyDiscounts();
  }

  getPriceByProductId(id) {
    return this.pricingRules.products[id].value;
  }

  applyDiscounts() {
    if (this.pricingRules.discounts !== undefined) {
      this.pricingRules.discounts.forEach(this.applyDiscount, this);
    }
  }

  applyDiscount(discount) {
    DiscountStrategyFactory.getStrategy(discount.type).apply(this.cart, discount);
  }

  total() {
    return this.cart.getTotal();
  }

  getCart(){
    return this.cart;
  }
}

module.exports = CheckoutService;
