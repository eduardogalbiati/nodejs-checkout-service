'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('ValueStrategy', function() {

  const ValueStrategy = new (require('app/Service/Discounts/ValueStrategy'));
  const Product = require('app/Domain/Representation/Product');
  const Cart = require('app/Domain/Representation/Cart');

  it('should apply discount', function() {

    let cart = new Cart;

    let item = new Product('standout');
    item.value = 100;

    cart.addProduct(item);

    let discount = {
      productId: 'standout',
      type: 'value',
      data:{
        value: 60
      }
    }

    ValueStrategy.apply(cart, discount);

    expect(cart.products[0].discount).to.be.equal(40);
    expect(cart.products[0].value).to.be.equal(100);
  });

  it('should apply discount only on standout', function() {

    let cart = new Cart;

    let item = new Product('standout');
    item.value = 100;

    let item2 = new Product('premium');
    item2.value = 101;

    cart.addProduct(item);
    cart.addProduct(item2);

    let discount = {
      productId: 'standout',
      type: 'value',
      data:{
        value: 60
      }
    }

    ValueStrategy.apply(cart, discount);

    expect(cart.products[0].discount).to.be.equal(40);
    expect(cart.products[0].value).to.be.equal(100);
    expect(cart.products[1].discount).to.be.equal(0);
    expect(cart.products[1].value).to.be.equal(101);
  });
});
