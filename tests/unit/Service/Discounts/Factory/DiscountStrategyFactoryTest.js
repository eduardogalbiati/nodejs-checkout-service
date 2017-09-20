'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('DiscountStrategyFactory', function() {

  const DiscountStrategyFactory = require('app/Service/Discounts/Factory/DiscountStrategyFactory');
  const Discounts = require("app/Service/Discounts");

  it('getStrategy() should return a ValueStrategy if type passed equals value', function() {
    expect(DiscountStrategyFactory.getStrategy('value')).to.be.an.instanceof(Discounts['ValueStrategy']);
  });

  it('getStrategy() should return a PackageStrategy if type passed equals package', function() {
    expect(DiscountStrategyFactory.getStrategy('package')).to.be.an.instanceof(Discounts['PackageStrategy']);
  });

  it('getStrategy() should return a QuantityStrategy if type passed equals package', function() {
    expect(DiscountStrategyFactory.getStrategy('quantity')).to.be.an.instanceof(Discounts['QuantityStrategy']);
  });

  it('getStrategy() should throw an execption when strategy not found', function() {
    expect(() => DiscountStrategyFactory.getStrategy('unknown')).to.throw(
      'Strategy (unknown) not found'
    )
  });
});