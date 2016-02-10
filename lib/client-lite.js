"use strict";
var callService = require('./call-service');

module.exports = (function(consumer) {
  // Private Members
  var _consumer;
  var _callService;

  // Public class ClientLite
  return new class {

    constructor() {
      if(!consumer || !(consumer.secret && consumer.key)) {
        throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
      }

      _consumer = consumer;
      _callService = new callService();
    }

  }();
  
});
