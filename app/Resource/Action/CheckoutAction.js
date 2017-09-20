'use strict';

class CheckoutAction {
  constructor(
    checkoutValidator,
    pricingRulesRepository,
    productsUnserializer,
    checkoutServiceFactory,
    responseBuilder
  ){
    this.checkoutValidator = checkoutValidator;
    this.pricingRulesRepository = pricingRulesRepository;
    this.productsUnserializer = productsUnserializer;
    this.checkoutServiceFactory = checkoutServiceFactory;
    this.responseBuilder = responseBuilder;
  }

  /**
   * Checkout Action
   * @param {object} req - Request
   * @param {object} res - Response
   * @returns {object} res - Response
   */
  async checkoutAction(req, res) {
    try {
      
      this.checkoutValidator.validate(req.body);
      const princingRules = await this.pricingRulesRepository.getByCustomerId(req.body.customerId);
      const checkout = this.checkoutServiceFactory.make(princingRules);
      const products = this.productsUnserializer.unserialize(req.body);

      products.forEach((product) => {
        checkout.addItem(product)
      }, this);
      return this.responseBuilder.successFromCart(res, checkout.getCart());
    } catch (err) {
      return this.responseBuilder.error(res, err);
    }
  }
}

module.exports = CheckoutAction;
