'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('CheckoutValidatorTest', function() {
  const CheckoutValidator = require('app/Resource/Validator/CheckoutValidator');

  it('validate() should throw an exception if the payload doesnt match schema', function() {
    expect(() => {CheckoutValidator.validate({})}).to.throw();
  });

  it('validate() should return true if everything is ok', function() {
    expect(CheckoutValidator.validate({
      "customerId": "ford",
      "products": [
        {
          "id": "premium",
          "quantity": 3
        }
      ]
    })).to.equal(true);
  });

});