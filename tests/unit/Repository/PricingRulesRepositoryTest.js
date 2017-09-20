const chai = require('chai');
const asyncawait = require('async-request');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('PricingRulesRepository', function() { 
  const PricingRulesRepository = require('app/Repository/PricingRulesRepository');

  it('getPlanByCustomer() should return the body from request parsed into json object', function() {

    //mocking async-request
    const mockAsyncAwait = async (string) => {
      return { body:'{}' }
    }

    mockAsyncAwait.response = {};

    const repository = new PricingRulesRepository(mockAsyncAwait); 
    expect(repository.getByCustomerId('apple')).to.eventually.equal({});
  });

  it('getPlanByCustomer() should throw an exception if request goes wrong', function() {

    //mocking async-request
    const mockAsyncAwait = () => {
      throw (new Error('My custom error'))
    }
    mockAsyncAwait.response = {};

    const repository = new PricingRulesRepository(mockAsyncAwait); 

    expect(repository.getByCustomerId('apple')).be.rejectedWith(
      'My custom error'
    );
  });

});


