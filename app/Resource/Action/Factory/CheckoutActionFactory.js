'use strict';

const CheckoutAction = require('app/Resource/Action/CheckoutAction');
const PricingRulesRepository = require('app/Repository/PricingRulesRepository');

class CheckoutActionFactory {
  /**
   * Make (Checkout Action FActory)
   * @returns {object} CheckoutAction - CheckoutAction instance
   */
  static make(){
    return new CheckoutAction(
      require('app/Resource/Validator/CheckoutValidator'),
      new PricingRulesRepository(
        require('async-request')
      ),
      require('app/Domain/Serializer/ProductsUnserializer'),
      require('app/Service/Factory/CheckoutServiceFactory'),
      require('app/Response/CheckoutResponseBuilder')
    );
  }

}

module.exports = CheckoutActionFactory;
