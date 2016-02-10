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

    // Accounts
    accounts(id) {
      var resource = 'accounts/';
      if (id) { resource += id + '/'; }

      return {
        get(params) {
          return _callService.get(resource, params);
        },

        post(body, params) {
          return _callService.post(resource, body, params);
        }

      }
    }
    //End Accounts

  }();

});
