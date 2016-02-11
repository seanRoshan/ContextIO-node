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
        },

        delete() {
          if(!id) {
            throw new Error("Missing required parameter id");
          }
          return _callService.delete(resource);
        }

      }
    }
    //End Accounts

    // Discovery
    discovery() {
      var resource = 'discovery/';

      return {
        get(params) {
          return _callService.get(resource, params);
        }
      }
    }
    //End Discovery

    // Oauth Providers
    oauth_providers(key) {
      var resource = 'oauth_providers/';
      if (key) { resource += key + '/'; }

      return {
        get() {
          return _callService.get(resource);
        },

        post(body) {
          return _callService.get(resource);
        },

        delete(params) {
          if(!key) {
            throw new Error("Missing required parameter key");
          }
          return _callService.delete(resource);
        }
      }
    }
    //End Oauth Providers

  }();

});
