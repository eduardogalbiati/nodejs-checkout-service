'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('CheckoutActionFactory', function() {
  const ResponseBuilder = require('app/Response/ResponseBuilder');

  it('success() should call res.send and return status code 200', function() {
    let res = {
      send: (code, data) => {
        return {
          code: code,
          data: data
        }
      }
    }
    
    let expectRes = {
      code: 200,
      data: 'custom data'
    }
    expect(ResponseBuilder.success(res, 'custom data')).to.be.deep.equal(expectRes);
  });

  it('error() should call res.send and return status code and message from error', function() {
    let res = {
      send: (code, data) => {
        return {
          code: code,
          data: data
        }
      }
    }
    
    let error = {
      code: 412,
      message: 'custom message'
    }

    let expectRes = {
      code: 412,
      data: {
        code: 412,
        message: 'custom message'
      }
    }
    expect(ResponseBuilder.error(res, error)).to.be.deep.equal(expectRes);
  });

  it('error() should call res.send and return status code 500 and message from error', function() {
    let res = {
      send: (code, data) => {
        return {
          code: code,
          data: data
        }
      }
    }
    
    let error = {
      message: 'custom message'
    }

    let expectRes = {
      code: 500,
      data: {
        code: 500,
        message: 'custom message'
      }
    }
    expect(ResponseBuilder.error(res, error)).to.be.deep.equal(expectRes);
  });
});