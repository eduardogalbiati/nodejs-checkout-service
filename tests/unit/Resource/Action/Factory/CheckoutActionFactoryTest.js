'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('CheckoutActionFactory', function() {
  const CheckoutActionFactory = require('app/Resource/Action/Factory/CheckoutActionFactory');
  const CheckoutAction = require('app/Resource/Action/CheckoutAction');

  it('getStrategy() should return a ValueStrategy if type passed equals value', function() {
    expect(CheckoutActionFactory.make()).to.be.an.instanceof(CheckoutAction);
  });
});