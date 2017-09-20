// tests/part1/cart-summary-test.js
const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai

describe('ProductUnserializer', function() {
  const ProductsUnserializer = require('app/Domain/Serializer/ProductsUnserializer');
  const Product = require('app/Domain/Representation/Product');

  it('unserialize() should return a empty collection', function() {
    const payload = {
      products: []
    };
    const collection = [];

    expect(ProductsUnserializer.unserialize(payload)).to.have.all.members(collection);
  });

  it('unserialize() should throw an exception when payload does not have products index', function() {
    const payload = {};

    expect(() => ProductsUnserializer.unserialize(payload)).to.throw('Payload should have products index');
  });

  it('unserialize() should return an collection base on payload', function() {
    const payload = {};
    expect(() => ProductsUnserializer.unserialize(payload)).to.throw(
      'Payload should have products index'
    );
  });

  it('unserialize() should return a empty collection', function() {
    const payload = {
      products: [
        {
          id: 'classic',
          quantity: 2
        },
        {
          id: 'standout',
          quantity: 1
        },
        {
          id: 'premium',
          quantity: 3
        }
      ]
    };

    const collection = [
      new Product('classic'),
      new Product('classic'),
      new Product('standout'),
      new Product('premium'),
      new Product('premium'),
      new Product('premium'),
    ];

    expect(ProductsUnserializer.unserialize(payload)).to.deep.equal(collection);
  });
});