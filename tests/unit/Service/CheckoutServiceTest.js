'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('total', function() {
  const CheckoutServiceFactory = require('app/Service/Factory/CheckoutServiceFactory');
  it('total() should return the sum of values bases on quantity', function() {
  var Product = require('./../../../app/Domain/Representation/Product');
    var CheckoutService = CheckoutServiceFactory.make({
      products:{
        'classic': {
          value: 269.99
        },
        'standout': {
          value: 322.99
        },
        'premium': {
          value: 394.99
        }
      }
    });

    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('premium'));

    expect(CheckoutService.total()).to.equal(987.97);
  });
});

describe('unilever testCase', function() {
  it('total() should return the sum of values bases on quantity', function() {
  var CheckoutServiceFactory = require('app/Service/Factory/CheckoutServiceFactory');
  var Product = require('./../../../app/Domain/Representation/Product');
    var CheckoutService = CheckoutServiceFactory.make({
      products:{
        'classic': {
          value: 269.99
        },
        'standout': {
          value: 322.99
        },
        'premium': {
          value: 394.99
        }
      },
      discounts:[
        {
          productId: 'classic',
          type: 'package',
          data: {
            total: 3,
            pay: 2
          }
        }
      ]
    });


    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('premium'));

    expect(CheckoutService.total()).to.equal(934.97);
  });
});



describe('Apple testCase', function() {
  it('total() should return the sum of values bases on quantity', function() {
  var CheckoutServiceFactory = require('app/Service/Factory/CheckoutServiceFactory');
  var Product = require('./../../../app/Domain/Representation/Product');
    var CheckoutService = CheckoutServiceFactory.make({
      products:{
        'classic': {
          value: 269.99
        },
        'standout': {
          value: 322.99
        },
        'premium': {
          value: 394.99
        }
      },
      discounts:[{
        productId: 'standout',
        type: 'value',
        data:{
          value: 299.99
        }
      }]
    });


    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('premium'));

    expect(CheckoutService.total()).to.equal(1294.96);
  });
});

describe('nike testCase', function() {
  it('total() should return the sum of values bases on quantity', function() {
  var CheckoutServiceFactory = require('app/Service/Factory/CheckoutServiceFactory');
  var Product = require('./../../../app/Domain/Representation/Product');
    var CheckoutService = CheckoutServiceFactory.make({
      products:{
        'classic': {
          value: 269.99
        },
        'standout': {
          value: 322.99
        },
        'premium': {
          value: 394.99
        }
      },
      discounts:[
        {
          productId: 'premium',
          type: 'quantity',
          data: {
            min: 4,
            value: 379.99
          }
        }
      ]
    });

    CheckoutService.addItem(new Product('premium'));
    CheckoutService.addItem(new Product('premium'));
    CheckoutService.addItem(new Product('premium'));
    CheckoutService.addItem(new Product('premium'));

    expect(CheckoutService.total()).to.equal(1519.96);
  });
});



describe('ford testCase', function() {
  it('total() should return the sum of values bases on quantity', function() {
  var CheckoutServiceFactory = require('app/Service/Factory/CheckoutServiceFactory');
  var Product = require('./../../../app/Domain/Representation/Product');
    var CheckoutService = CheckoutServiceFactory.make({
      products:{
        'classic': {
          value: 269.99
        },
        'standout': {
          value: 322.99
        },
        'premium': {
          value: 394.99
        }
      },
      discounts:[
        {
          productId: 'classic',
          type: 'package',
          data: {
            total: 5,
            pay: 4
          }
        },
        {
          productId: 'premium',
          type: 'quantity',
          data: {
            min: 3,
            value: 389.99
          }
        },
        {
          productId: 'standout',
          type: 'value',
          data:{
            value: 309.99
          }
        }
      ]
    });


    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('classic'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('standout'));
    CheckoutService.addItem(new Product('premium'));
    CheckoutService.addItem(new Product('premium'));
    CheckoutService.addItem(new Product('premium'));

    expect(CheckoutService.total()).to.equal(2909.91);
  });
});