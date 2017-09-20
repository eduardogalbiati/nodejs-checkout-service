'use strict'

class Cart {
  
  constructor(){
    this.products = [];
  }

  addProduct(product){
    this.products.push(product);
  }

  getProduct(id){
    return this.products[id];
  }

  getProducts(){
    return this.products;
  }

  getTotal(){
    // TODO: lodash-it!
    let total = 0;
    this.products.forEach(function(item){
      total += item.value - item.discount;
    }, this)
    return total;
  }
}

module.exports = Cart