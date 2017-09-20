'use strict'

const chai = require('chai');
const expect = chai.expect;

describe('total', function() {

  let request = require('async-request'),
    response
  
  it('API should return value for DEFAULT', async function() {

    const payload = {
      "customerId": "default",
      "products": [{
          "id": "premium",
          "quantity": 1
        },
        {
          "id": "classic",
          "quantity": 1
        },
        {
          "id": "standout",
          "quantity": 1
        }
      ]
    }

    try {
      response = await request(`http://0.0.0.0:8080/checkout`,
        {
          method: 'POST',
          data: payload,
          headers: {
              "content-type": 'application/json'
          }
      });
    } catch(err) {

    }

    let json = JSON.parse(response.body);
    const expectedResponse = JSON.parse('{"products":[{"id":"premium","value":394.99,"discount":0},{"id":"classic","value":269.99,"discount":0},{"id":"standout","value":322.99,"discount":0}],"total":987.97}');
    expect(json.total).to.equal(expectedResponse.total);
  });

  it('API should return value for NIKE', async function() {

    const payload = {
      "customerId": "nike",
      "products": [{
          "id": "premium",
          "quantity": 4
        }
      ]
    }
    try {
      response = await request(`http://0.0.0.0:8080/checkout`,
        {
          method: 'POST',
          data: payload,
          headers: {
              "content-type": 'application/json',
              "keep-alive": false,

          }
      });
    }catch(err){

    }
    let json = JSON.parse(response.body);
    const expectedResponse = JSON.parse('{"products":[{"id":"premium","value":394.99,"discount":15},{"id":"premium","value":394.99,"discount":15},{"id":"premium","value":394.99,"discount":15},{"id":"premium","value":394.99,"discount":15}],"total":1519.96}');
    expect(json.total).to.equal(expectedResponse.total);
  });

  it('API should return value for FORD', async function() {

    const payload = {
      "customerId": "ford",
      "products": [
        {
          "id": "premium",
          "quantity": 3
        },
        {
          "id": "standout",
          "quantity": 3
        },
        {
          "id": "classic",
          "quantity": 3
        }
      ]
    }

    try {
      response = await request(`http://0.0.0.0:8080/checkout`,
        {
          method: 'POST',
          data: payload,
          headers: {
              "content-type": 'application/json',
              "keep-alive": false,

          }
      });
    }catch(err){

    }
    let json = JSON.parse(response.body);
    const expectedResponse = JSON.parse('{"products":[{"id":"premium","value":394.99,"discount":5,"total":389.99},{"id":"premium","value":394.99,"discount":5,"total":389.99},{"id":"premium","value":394.99,"discount":5,"total":389.99},{"id":"standout","value":322.99,"discount":13,"total":309.99},{"id":"standout","value":322.99,"discount":13,"total":309.99},{"id":"standout","value":322.99,"discount":13,"total":309.99},{"id":"classic","value":269.99,"discount":0,"total":269.99},{"id":"classic","value":269.99,"discount":0,"total":269.99},{"id":"classic","value":269.99,"discount":0,"total":269.99}],"total":2909.91}');
    expect(json).to.deep.equal(expectedResponse);
  });

  it('API should return value for APPLE', async function() {

    const payload = {
      "customerId": "apple",
      "products": [{
          "id": "standout",
          "quantity": 3
        },
        {
          "id": "premium",
          "quantity": 1
        }
      ]
    }

    try {
      response = await request(`http://0.0.0.0:8080/checkout`,
        {
          method: 'POST',
          data: payload,
          headers: {
              "content-type": 'application/json',
              "keep-alive": false,

          }
      });
    }catch(err){

    }
    let json = JSON.parse(response.body);
    const expectedResponse = JSON.parse('{"products":[{"id":"standout","value":322.99,"discount":23},{"id":"standout","value":322.99,"discount":23},{"id":"standout","value":322.99,"discount":23},{"id":"premium","value":394.99,"discount":0}],"total":1294.96}');
    expect(json.total).to.equal(expectedResponse.total);
  });
  it('API should return value for UNILEVER', async function() {

    const payload = {
      "customerId": "unilever",
      "products": [{
          "id": "classic",
          "quantity": 3
        },
        {
          "id": "premium",
          "quantity": 1
        }
      ]
    }

    try {
      response = await request(`http://0.0.0.0:8080/checkout`,
        {
          method: 'POST',
          data: payload,
          headers: {
              "content-type": 'application/json',
              "keep-alive": false,

          }
      });
    }catch(err){

    }
    let json = JSON.parse(response.body);
    const expectedResponse = JSON.parse('{"products":[{"id":"classic","value":269.99,"discount":269.99},{"id":"classic","value":269.99,"discount":0},{"id":"classic","value":269.99,"discount":0},{"id":"premium","value":394.99,"discount":0}],"total":934.97}');
    expect(json.total).to.equal(expectedResponse.total);
  });
});
