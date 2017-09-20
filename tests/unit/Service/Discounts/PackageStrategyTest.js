'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('PackageStrategy', function() {
  const PackageStrategy = new (require('app/Service/Discounts/PackageStrategy'));
  const Product = require('app/Domain/Representation/Product');
  const Cart = require('app/Domain/Representation/Cart');

  it('should be applied', function() {

    let cart = new Cart;

    let item = new Product('standout');
    item.value = 100;

    cart.addProduct(item);

    let item2 = new Product('standout');
    item2.value = 100;

    cart.addProduct(item2);

    let discount = {
      productId: 'standout',
      type: 'package',
      data: {
        total: 2,
        pay: 1
      }
    };

    PackageStrategy.apply(cart, discount);

    expect(cart.products[0].discount).to.be.equal(100);
    expect(cart.products[0].value).to.be.equal(100); 
    expect(cart.products[1].discount).to.be.equal(0);
    expect(cart.products[1].value).to.be.equal(100);
  });
});


