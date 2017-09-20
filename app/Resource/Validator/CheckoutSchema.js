'use strict';

class CheckoutSchema {
  static getSchema(){
    return JSON.parse(
      `{
        "definitions": {}, 
        "$id": "http://example.com/example.json", 
        "properties": {
          "customerId": {
            "description": "An explanation about the purpose of this instance.", 
            "id": "/properties/customerId", 
            "title": "The customerid schema", 
            "type": "string"
          }, 
          "products": {
            "id": "/properties/products", 
            "items": {
              "id": "/properties/products/items", 
              "properties": {
                "id": {
                  "description": "An explanation about the purpose of this instance.", 
                  "id": "/properties/products/items/properties/id", 
                  "title": "The id schema", 
                  "type": "string"
                }, 
                "quantity": {
                  "description": "An explanation about the purpose of this instance.", 
                  "id": "/properties/products/items/properties/quantity", 
                  "title": "The quantity schema", 
                  "type": [
                    "string", 
                    "integer"
                  ]
                }
              }, 
              "required": [
                "quantity", 
                "id"
              ], 
              "type": "object"
            }, 
            "type": "array"
          }
        }, 
        "required": [
          "products"
        ], 
        "type": "object"
      }`
    );
  }
}

module.exports = CheckoutSchema;
