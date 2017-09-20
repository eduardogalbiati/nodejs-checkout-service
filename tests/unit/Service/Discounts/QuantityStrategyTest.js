'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('QuantityStrategy', function() {

  const QuantityStrategy = new (require('app/Service/Discounts/QuantityStrategy'));
  const Product = require('app/Domain/Representation/Product');
  const Cart = require('app/Domain/Representation/Cart');

  it('should not apply discount', function() {

    let cart = new Cart;

    cart.addProduct(new Product('standout'));

    let originalcart = Object.assign({}, cart);

    let discount = {
      productId: 'standout',
      data: {
        min: 2,
        value: 99
      }
    }

    QuantityStrategy.apply(cart, discount);

    expect(cart).to.deep.equal(originalcart);
  });

  it('should apply discount', function() {

    let cart = new Cart;

    let item = new Product('standout');
    item.value = 100;

    cart.addProduct(Object.assign({}, item));
    cart.addProduct(Object.assign({}, item));

    let originalcart = Object.assign({}, cart);
    
    let discount = {
      productId: 'standout',
      data: {
        min: 2,
        value: 99
      }
    }

    QuantityStrategy.apply(cart, discount);

    expect(cart.products[0].discount).to.be.equal(1);
    expect(cart.products[0].value).to.be.equal(100);
    expect(cart.products[1].discount).to.be.equal(1);
  });

  it('should apply discount', function() {

    let cart = new Cart;

    let item = new Product('standout');
    item.value = 100;

    cart.addProduct(Object.assign({}, item));
    cart.addProduct(Object.assign({}, item));
    cart.addProduct(Object.assign({}, item));

    let originalcart = Object.assign({}, cart);
    
    let discount = {
      productId: 'standout',
      data: {
        min: 2,
        value: 99
      }
    }

    QuantityStrategy.apply(cart, discount);

    expect(cart.products[0].discount).to.be.equal(1);
    expect(cart.products[0].value).to.be.equal(100);
    expect(cart.products[1].discount).to.be.equal(1);
    expect(cart.products[1].value).to.be.equal(100);
    expect(cart.products[2].discount).to.be.equal(1);
    expect(cart.products[2].value).to.be.equal(100);
  });
});