'use strict';

const restify = require('restify');
const CheckoutActionFactory = require('app/Resource/Action/Factory/CheckoutActionFactory');

const server = restify.createServer({
  name: 'nodejs-checkout',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.on('uncaughtException', function (req, res, route, err) {
   return res.send(err)
});

server.post('/checkout', function (req, res, next) {
  const CheckoutAction = CheckoutActionFactory.make();
  CheckoutAction.checkoutAction(req, res);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});