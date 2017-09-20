const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('CheckoutAction', function() {
  const CheckoutAction = require('app/Resource/Action/CheckoutAction');
	const Cart = require('app/Domain/Representation/Cart');

  it('checkout() should return the buildFromCart result if everything is ok', function() {

    const ValidatorMock = {
      validate: () => {
        return true;
      }
    }

    const PricingRulesRepositoryMock = {
      getByCustomerId: async () => {
        return {};
      }
    }

    const ProductsUnserializer = {
      unserialize: () => {
        return [];
      }
    }

    const CheckoutServiceFactory =  {
      make: () => {
        return {
          addItem: () => {
            return true;
          },
          getCart: () => {
            return new Cart();
          }
        }
      }
    }

    const ResponseBuilder = {
      buildFromCart: () => {
        return '0';
      }
    }

    var action = new CheckoutAction(
        ValidatorMock,
        PricingRulesRepositoryMock,
        ProductsUnserializer,
        CheckoutServiceFactory,
        ResponseBuilder
    );

    var req = {
      body: {
        customerId: 'nike',
        products: [
          {
            id: 'classic',
            quantity: 3
          },
          {
            id: 'premium',
            quantity: 1
          }
        ]
      }
    }

    var res = {
      send: (code, data) => {
        return data;
      }
    };

    expect(action.checkoutAction(req, res)).to.eventually.equal('0');
  });

  it('checkout() should resolve response with status 500', function() {
    const ValidatorMock = {
      validate: () => {
        return true;
      }
    }

    const PricingRulesRepositoryMock = {
      getByCustomerId: async () => {
        return {};
      }
    }

    const ProductsUnserializer = {
      unserialize: () => {
        throw new Error('test error');
      }
    }

    const CheckoutServiceFactory =  {
      make: () => {
        return {
          addItem: () => {
            return true;
          },
          getCart: () => {
            return new Cart();
          }
        }
      }
    }

    const ResponseBuilder = {
      buildFromCart: () => {
          return '0';
      }
    }

    var action = new CheckoutAction(
        ValidatorMock,
        PricingRulesRepositoryMock,
        ProductsUnserializer,
        CheckoutServiceFactory,
        ResponseBuilder
    );

    var req = {
      body: {
        customerId: 'nike',
        products: [
          {
            id: 'classic',
            quantity: 3
          },
          {
            id: 'premium',
            quantity: 1
          }
        ]
      }
    }

    var res = {
      send: (code, data) => {
        return code;
      }
    };

    expect(action.checkoutAction(req, res)).to.eventually.equal(500);
  });
});