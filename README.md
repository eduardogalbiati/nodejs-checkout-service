# nodejs-checkout-service

A Rest API built with Node 8, Restify, Docker Compose and MountBank mockserver.
Recieves a product list with a customer id associated, deal with discounts and return a cart object with all information about the products.


# Table of Contents

* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Unit test](#running-the-unit-tests)
* [Functional test](#running-the-functional-tests)
* [Built With](#built-with)
* [Examples](#examples)
* [Action-Domain-Responder Pattern](#action-domain-responder-pattern)
  * [Action](#action)
    * [Body Validation](#body-validation)
    * [Product Unserilizer](#product-unserializer)
    * [Pricing Repository](#pricing-repository)
  * [Domain](#domain)
    * [Checkout Service](#checkout-service)
    * [Product](#product)
    * [Cart](#cart)
    * [Discounts](#discounts)
      * [Value Discount](#value-discount)
      * [Quantity Discount](#quantity-discount)
      * [Package Discount](#package-discount)
      * [Strategy Factory](#strategy-factory)
  * [Responder](#responder)
    * [Checkout Responder](#checkout-responder)
    * [Error Messages](#error-messages)
    * [Status Code](#status-code)

## Getting Started

```docker-compose up``` will start 2 cointainers:
  - nodejs-checkout-service
  - pricing-mock-server

nodejs-checkout-service can be accessed on ```localhost:8080```

## Prerequisites

  - Docker (https://www.docker.com/get-docker)
  - Docker Compose (https://docs.docker.com/compose/gettingstarted/) 
  

## Running the unit tests

```docker-compose -f docker-compose-unit.yml up```

## Running the functional tests

```docker-compose -f docker-compose-functional.yml up```


## Built With

* [Docker](https://www.docker.com/get-docker) - Container
* [Docker Compose](https://docs.docker.com/compose/gettingstarted/) - Container Orchestrator
* [Node8](https://rometools.github.io/rome/) - Backend programmimg language
* [Restify](https://rometools.github.io/rome/) - Framework
* [MountBank](https://rometools.github.io/rome/) - Mock server


## Examples

  POST to ```localhost:8080/checkout``` with request header ```application/json``` and body:

  ```json
  {
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

  ```
  should respond:

  ```json
  {
    "products": [
        {
            "id": "premium",
            "value": 394.99,
            "discount": 0,
            "total": 394.99
        },
        {
            "id": "classic",
            "value": 269.99,
            "discount": 0,
            "total": 269.99
        },
        {
            "id": "standout",
            "value": 322.99,
            "discount": 0,
            "total": 322.99
        }
    ],
    "total": 987.97
  }
  ```

  Where: 
    - ```customerId``` can be (unilever, nike, apple, ford, or default)
    - ```product.id``` can be (classic, standout or premium)

  Status codes:
    - ```200 OK```
    - ```412 Assert pre-condition failed``` (invalid payload)
    - ```500 Internal server error```


## Action-Domain-Responder Pattern

  (ADR) is a software architectural pattern that was proposed by Paul M. Jones as a refinement of Model–view–controller (MVC) that is better suited for web applications. [Read more...](https://en.wikipedia.org/wiki/Action%E2%80%93domain%E2%80%93responder)

### Action

  The action takes HTTP requests (URLs and their methods) and uses that input to interact with the domain, after which it passes the domain's output to one and only one responder.

  nodejs-checkout-service action deals with request and response, injecting validated/filtered data on the Domain layer

  #### Body Validation

  The validation is based on [Json draft schema](http://json-schema.org/documentation.html), there is a awesome tool to generate it [Json schema generator](https://jsonschema.net/#/editor)

  #### Product Unserializer

  Responsible for transform a json payload into Domain objects

  #### Pricing Repository

  Fetchs information from external services/databases. [Learn more](https://martinfowler.com/eaaCatalog/repository.html)_

### Domain

  The domain can modify state, interacting with storage and/or manipulating data as needed. It contains the business logic.

  #### Checkout Service

  Top layer of domain, the CheckoutAction interacts with this service and then send the output to responder

  #### Product

  Product representation

  ```js
    class Product {

      constructor(id) {
        this.id = id;
        this.value = 0;
        this.discount = 0;
        this.total = 0;
      }      
    }
  ```

  #### Cart

  Cart representation

 ```js
    class Cart {
  
      constructor(){
        this.products = [];
      }
    }
  ```

  #### Discounts

  There are 3 types of discounts:

  ##### Value Discount

  Applies directly on value, for example, if a product value is $100.00, and we want to apply a $10.00 Value discount, the product value will be $90.00.

  ##### Quantity Discount

  Similar to value discount, but just applied when a minimum quantity of products is reached.

  ##### Package Discount

  Based on quantity, eg.: every 5 products purchased you pay only 4.

  ##### Strategy Factory

  Responsible for constructing the discount strategy, based on pricing rules.

### Responder

  The responder builds the entire HTTP response from the domain's output which is given to it by the action.

  ### Checkout Responder

  Extends abstract responder and knows how to build a responde from ```Cart``` object


# Unit test coverage
  ![alt tag](https://raw.githubusercontent.com/eduardogalbiati/nodejs-checkout-service/master/docs/coverage/coverage-report.png) 












