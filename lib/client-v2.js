"use strict";
var callService = require('./call-service');

module.exports = (function(consumer) {
  // Private Members
  var _callService;

  // Public class ClientV2
  return new class {

    constructor() {
      if(!consumer || !(consumer.secret && consumer.key)) {
        throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
      }
      _callService = new callService('2.0', consumer);
    }

    listAccounts() {
      return _callService.doCall('accounts')
      .then(function(res) {
        console.log(res)
        return res;
      }).catch(function(err){
        console.error(err)
      });
    }

  }();

});
